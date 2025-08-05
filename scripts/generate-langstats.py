import os
import re
import json
import requests
from pathlib import Path
from collections import defaultdict

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


COLOR_MAP = {
    "Ada": "#bb3e41",
    "Agda": "#957fb8",
    "Angular": "#c34043",
    "Assembly": "#d27e99",
    "Astro": "#ffa066",
    "Bash": "#89e051",
    "C": "#555555",
    "Clojure": "#7aa89f",
    "COBOL": "#c0a36e",
    "Coq": "#7e9cd8",
    "Cpp": "#00599c",
    "Crystal": "#7aa89f",
    "CSharp": "#178600",
    "CSS": "#563d7c",
    "D": "#ba595e",
    "Dart": "#00b4ab",
    "Elixir": "#6e4a7e",
    "Elm": "#60b5cc",
    "Erlang": "#b83998",
    "Fennel": "#fff3d7",
    "Fortran": "#4d41b1",
    "GAP": "#8fc1ff",
    "Gleam": "#ffaff3",
    "Go": "#00add8",
    "GraphQL": "#e10098",
    "Haskell": "#5e5086",
    "HDL": "#c0a36e",
    "HTML": "#e34c26",
    "HTTP": "#7aa89f",
    "Hugo": "#7aa89f",
    "Idris": "#b2b7f8",
    "Isabelle": "#bd81c0",
    "Java": "#b07219",
    "JavaScript": "#f1e05a",
    "Julia": "#a270ba",
    "Jupyter": "#da5b0b",
    "Kotlin": "#a97bff",
    "LaTeX": "#3d6117",
    "Lean": "#c34043",
    "Lisp": "#7aa89f",
    "Lua": "#000080",
    "Markdown": "#7aa89f",
    "Mathematica": "#d0101b",
    "MATLAB": "#e16737",
    "Maxima": "#4a6c6f",
    "Nim": "#ffc200",
    "Nix": "#658594",
    "Nodejs": "#44883e",
    "ObjC": "#438eff",
    "OCaml": "#3be133",
    "Odin": "#867edb",
    "Pascal": "#b0ceff",
    "Perl": "#0298c3",
    "PHP": "#4f5d95",
    "Prolog": "#74283c",
    "Python": "#3572A5",
    "R": "#198ce7",
    "Racket": "#9f1d20",
    "React": "#61dafb",
    "Ruby": "#701516",
    "Rust": "#dea584",
    "Sage": "#7aa89f",
    "Scala": "#c22d40",
    "Scheme": "#1e4aec",
    "Scientific": "#7aa89f",
    "Shaders": "#6e4a7e",
    "Shell": "#89e051",
    "Solidity": "#363636",
    "SQL": "#e38c00",
    "Svelte": "#ff3e00",
    "Swift": "#f05138",
    "TypeScript": "#2b7489",
    "Typst": "#7e9cd8",
    "V": "#4f87c4",
    "Vue": "#41b883",
    "Zig": "#ec915c",
}

EXCLUDED_LANGS = {"Markdown", "YAML", "JSON", "Text"}

DATA_DIR = Path("assets/data/langstats")
CONTENT_DIR = Path("content/projects")


def get_repo_languages(repo_url: str):
    match = re.search(r"github\.com/([^/]+)/([^/]+)", repo_url)
    if not match:
        raise ValueError(f"Invalid GitHub repo URL: {repo_url}")
    owner, repo = match.groups()

    headers = {
        "User-Agent": "Hugo-LangStats",
    }
    if token := os.getenv("GITHUB_TOKEN"):
        headers["Authorization"] = f"token {token}"

    res = requests.get(
        f"https://api.github.com/repos/{owner}/{repo}/languages", headers=headers
    )
    if not res.ok:
        raise RuntimeError(
            f"Failed to fetch GitHub languages: {res.status_code} {res.text}"
        )
    data = res.json()

    total_bytes = sum(data.values())
    if total_bytes == 0:
        return []

    lang_stats = [
        {
            "name": lang,
            "percent": round((bytes_ / total_bytes) * 100),
            "color": COLOR_MAP.get(lang, "#999999"),
        }
        for lang, bytes_ in data.items()
        if lang not in EXCLUDED_LANGS
    ]
    lang_stats.sort(key=lambda x: x["percent"], reverse=True)

    percent_sum = sum(l["percent"] for l in lang_stats)
    if percent_sum != 100 and lang_stats:
        lang_stats[0]["percent"] += 100 - percent_sum

    return lang_stats


def extract_repo_url(md_file: Path):
    content = md_file.read_text(encoding="utf-8")
    match = re.search(r"repository:\s*(.+)", content)
    if not match:
        return None
    return match.group(1).strip()


def main():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    md_files = list(CONTENT_DIR.glob("*.md"))

    console.print(
        Panel.fit(
            "[bold blue]Language Stats Generator – GitHub API[/bold blue]",
            box=box.DOUBLE,
            border_style="blue",
        )
    )
    console.print(f"[dim]Scanning project directory:[/dim] {CONTENT_DIR}")
    console.print(f"[dim]Output directory:[/dim] {DATA_DIR}")
    console.print()

    if not md_files:
        console.print("[yellow]No project markdown files found[/yellow]")
        return

    table = Table(box=box.ROUNDED, border_style="green")
    table.add_column("Project", style="cyan", width=30)
    table.add_column("Top Lang", style="magenta", justify="left", width=18)
    table.add_column("Languages", style="green", justify="left")
    table.add_column("Status", justify="center", width=10)

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        TextColumn("[progress.percentage]{task.percentage:>3.0f}%"),
        TimeElapsedColumn(),
        console=console,
    ) as progress:
        task = progress.add_task(
            "[green]Analyzing repositories...", total=len(md_files)
        )
        success, failed = 0, 0

        for md_file in md_files:
            slug = md_file.stem
            repo_url = extract_repo_url(md_file)
            if not repo_url:
                progress.advance(task)
                continue

            try:
                languages = get_repo_languages(repo_url)
                with open(DATA_DIR / f"{slug}.json", "w", encoding="utf-8") as f:
                    json.dump({"languages": languages}, f, indent=2)

                lang_str = ", ".join(
                    f"{l['name']} ({l['percent']}%)" for l in languages
                )
                top_lang = languages[0]["name"] if languages else "N/A"

                table.add_row(
                    f"[cyan]{slug}[/cyan]",
                    f"[magenta]{top_lang}[/magenta]",
                    lang_str,
                    "[green]OK[/green]",
                )
                success += 1
            except Exception as e:
                table.add_row(
                    f"[cyan]{slug}[/cyan]",
                    "[magenta]-[/magenta]",
                    "[dim]n/a[/dim]",
                    "[red]FAIL[/red]",
                )
                console.print(f"[red]❌ {slug}[/red]: {e}")
                failed += 1

            progress.advance(task)

    console.print()
    console.print(table)

    summary = Panel(
        f"[bold green]Language Stats Completed[/bold green]\n\n"
        f"[cyan]Projects processed:[/cyan] [bold]{len(md_files)}[/bold]\n"
        f"[cyan]Successful:[/cyan] [bold green]{success}[/bold green] "
        f"• [cyan]Failed:[/cyan] [bold red]{failed}[/bold red]\n"
        f"[cyan]Output directory:[/cyan] [dim]{DATA_DIR}[/dim]",
        title="[bold blue]Summary[/bold blue]",
        box=box.ROUNDED,
        border_style="green",
    )

    console.print()
    console.print(summary)


if __name__ == "__main__":
    main()
