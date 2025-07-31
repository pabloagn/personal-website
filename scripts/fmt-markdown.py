#!/usr/bin/env python3

import sys
import re
import yaml
from pathlib import Path
from typing import List

from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.progress import (
    Progress,
    SpinnerColumn,
    TextColumn,
    BarColumn,
    TimeElapsedColumn,
)
from rich import box

console = Console()

VALID_LANGUAGES = {
    "python",
    "bash",
    "sh",
    "javascript",
    "typescript",
    "json",
    "yaml",
    "toml",
    "html",
    "css",
    "scss",
    "cpp",
    "c",
    "go",
    "rust",
    "java",
    "kotlin",
    "swift",
    "haskell",
    "sql",
    "markdown",
    "text",
    "plaintext",
    "nix",
    "lua",
    "r",
    "julia",
}

FRONTMATTER_FIELDS = {
    "title": str,
    "categories": list,
    "tags": list,
    "tools": list,
    "summary": str,
    "catchphrase": str,
    "layout": str,
    "draft": bool,
    "math": bool,
    "date": str,
}

# ---------------- FIX FUNCTIONS ---------------- #


def remove_numbered_headings(line: str) -> str:
    return re.sub(r"^(#{1,6})\s+\d+(\.\d+)*\.?\s+", r"\1 ", line)


def remove_specific_markers(line: str) -> str:
    return "" if line.strip() in {"##### **Code**", "##### **Output**"} else line


def remove_bad_hr(line: str, in_frontmatter: bool) -> str:
    return "" if not in_frontmatter and line.strip() == "---" else line


def fix_table_figure(line: str) -> str:
    return re.sub(r"^###### (_(?:Table|Figure).*)", r"\1", line)


FIX_FUNCTIONS = {
    "numbering": remove_numbered_headings,
    "markers": remove_specific_markers,
    "hr": remove_bad_hr,
    "figures": fix_table_figure,
}


def transform_lines(lines: List[str], enabled_fixes: List[str]) -> List[str]:
    new_lines = []
    in_frontmatter = False
    delim_count = 0

    for line in lines:
        if line.strip() == "---":
            delim_count += 1
            in_frontmatter = delim_count <= 2
            new_lines.append(line)
            continue

        if "numbering" in enabled_fixes:
            line = remove_numbered_headings(line)
        if "markers" in enabled_fixes:
            line = remove_specific_markers(line)
        if "figures" in enabled_fixes:
            line = fix_table_figure(line)
        if "hr" in enabled_fixes:
            line = remove_bad_hr(line, in_frontmatter)

        if line.strip():
            new_lines.append(line)

    return new_lines


# ---------------- CHECK FUNCTIONS ---------------- #


def check_h1_headers(lines: List[str], issues: List[str]) -> None:
    for line in lines:
        if re.match(r"^#\s+", line):
            issues.append(f"[H1 HEADER] {line.strip()}")


def check_numbered_headings(lines: List[str], issues: List[str]) -> None:
    for line in lines:
        if re.match(r"^#+\s+\d+(\.\d+)*\s+", line):
            issues.append(f"[NUMBERED HEADING] {line.strip()}")


def check_codeblock_languages(lines: List[str], issues: List[str]) -> None:
    for line in lines:
        if line.startswith("```"):
            lang = line[3:].strip().lower()
            if lang and lang not in VALID_LANGUAGES:
                issues.append(f"[INVALID LANG] ```{lang}")


def check_specific_cases(lines: List[str], issues: List[str]) -> None:
    for line in lines:
        if line.strip() in {"##### **Code**", "##### **Output**"}:
            issues.append(f"[BAD MARKER] {line.strip()}")


def check_bad_horizontal_rules(lines: List[str], issues: List[str]) -> None:
    in_frontmatter = False
    frontmatter_count = 0
    for line in lines:
        if line.strip() == "---":
            frontmatter_count += 1
            in_frontmatter = frontmatter_count < 2
            continue
        if not in_frontmatter and line.strip() == "---":
            issues.append("[BAD HR] --- outside frontmatter")


def check_table_figure(lines: List[str], issues: List[str]) -> None:
    for line in lines:
        if re.match(r"###### _Table", line) or re.match(r"###### _Figure", line):
            issues.append(f"[BAD FIGURE/TABLE] {line.strip()}")


def check_frontmatter(path: Path, issues: List[str]) -> None:
    text = path.read_text(encoding="utf-8")
    match = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not match:
        issues.append("[FRONTMATTER] Missing or malformed frontmatter")
        return
    try:
        data = yaml.safe_load(match.group(1))
    except Exception as e:
        issues.append(f"[FRONTMATTER] YAML parse error: {e}")
        return
    for key, expected_type in FRONTMATTER_FIELDS.items():
        if key not in data:
            issues.append(f"[FRONTMATTER] Missing field: {key}")
        elif not isinstance(data[key], expected_type):
            issues.append(
                f"[FRONTMATTER] Invalid type for '{key}': expected {expected_type.__name__}, got {type(data[key]).__name__}"
            )


def run_all_checks(path: Path, lines: List[str]) -> List[str]:
    issues: List[str] = []
    check_h1_headers(lines, issues)
    check_numbered_headings(lines, issues)
    check_codeblock_languages(lines, issues)
    check_specific_cases(lines, issues)
    check_bad_horizontal_rules(lines, issues)
    check_table_figure(lines, issues)
    check_frontmatter(path, issues)
    return issues


# ---------------- ENTRYPOINTS ---------------- #


def find_markdown_files(root: Path) -> List[Path]:
    return [p for p in root.rglob("*.md") if p.is_file()]


def check_file(path: Path) -> List[str]:
    lines = path.read_text(encoding="utf-8").splitlines()
    return run_all_checks(path, lines)


def fix_file(path: Path, enabled_fixes: List[str]) -> None:
    lines = path.read_text(encoding="utf-8").splitlines()
    updated = transform_lines(lines, enabled_fixes)
    path.write_text("\n".join(updated) + "\n", encoding="utf-8")


def main() -> None:
    if len(sys.argv) < 2:
        console.print(
            "[red]Usage:[/red] python format_markdown.py <dir> [--check-only | --fix-only <fixes>]"
        )
        sys.exit(1)

    root = Path(sys.argv[1])
    mode = sys.argv[2] if len(sys.argv) >= 3 else None
    enabled_fixes = sys.argv[3:] if mode == "--fix-only" else []

    unknown = [f for f in enabled_fixes if f not in FIX_FUNCTIONS]
    if unknown:
        console.print(f"[red]Unknown fix keys:[/red] {', '.join(unknown)}")
        sys.exit(1)

    md_files = find_markdown_files(root)
    if not md_files:
        console.print("[yellow]No Markdown files found.[/yellow]")
        return

    console.print(
        Panel.fit("[bold blue]Markdown Formatter[/bold blue]", box=box.DOUBLE)
    )
    console.print(f"[dim]Scanning:[/dim] {root.resolve()}\n")

    if mode == "--check-only":
        from rich.table import Table

        table = Table(box=box.ROUNDED)
        table.add_column("File", style="cyan", width=40)
        table.add_column("Issues", style="red", justify="left")

        with Progress(
            SpinnerColumn(),
            TextColumn("{task.description}"),
            BarColumn(),
            TimeElapsedColumn(),
            console=console,
        ) as progress:
            task = progress.add_task("Checking files...", total=len(md_files))
            for f in md_files:
                issues = check_file(f)
                result = "\n".join(issues) if issues else "[green]✓ Clean[/green]"
                table.add_row(str(f.relative_to(root)), result)
                progress.advance(task)
        console.print(table)
        console.print(
            Panel.fit("[bold green]✓ Check complete[/bold green]", box=box.ROUNDED)
        )
        return

    elif mode == "--fix-only":
        with Progress(
            SpinnerColumn(),
            TextColumn("{task.description}"),
            BarColumn(),
            TimeElapsedColumn(),
            console=console,
        ) as progress:
            task = progress.add_task("Fixing files...", total=len(md_files))
            for f in md_files:
                fix_file(f, enabled_fixes)
                progress.advance(task)
        console.print(
            Panel.fit("[bold green]✓ Fix complete[/bold green]", box=box.ROUNDED)
        )
        return

    else:
        console.print(
            "[red]You must pass either --check-only or --fix-only <fixes>[/red]"
        )
        sys.exit(1)


if __name__ == "__main__":
    main()
