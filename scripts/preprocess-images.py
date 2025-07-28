#!/usr/bin/env python3
import subprocess, sys
from pathlib import Path
from itertools import chain
from typing import Dict, List, Union

try:
    import toml
    from rich.console import Console
    from rich.progress import (
        Progress,
        SpinnerColumn,
        TextColumn,
        BarColumn,
        TimeElapsedColumn,
    )
    from rich.table import Table
    from rich.panel import Panel
    from rich import box
except ImportError as e:
    sys.exit(f"Missing dependency: {e}")

console = Console()


def cfg() -> Dict[str, Union[Path, int, List[str]]]:
    root = Path(__file__).resolve().parent.parent
    c = toml.load(root / "config.toml")["preprocess-images"]
    return {
        "raw": (root / c["raw_dir"]).resolve(),
        "out": (root / c["processed_dir"]).resolve(),
        "webp_quality": c.get("webp_quality", 80),
        "extensions": c.get("extensions", ["jpg", "jpeg", "png"]),
    }


def ensure(p: Path) -> None:
    p.parent.mkdir(parents=True, exist_ok=True)


def convert_to_webp(src: Path, dst: Path, quality: int) -> str:
    # Change extension to .webp
    webp_dst = dst.with_suffix(".webp")
    ensure(webp_dst)

    result = subprocess.run(
        ["cwebp", "-q", str(quality), str(src), "-o", str(webp_dst)],
        check=True,
        capture_output=True,
        text=True,
    )
    return result.stderr.strip()


def parse_webp_stats(output: str) -> tuple[str, str, str]:
    """Parse WebP compression statistics"""
    lines = output.split("\n")
    for line in lines:
        if "bytes" in line and "->" in line:
            # Format: "Input: 123456 bytes, Output: 67890 bytes (45.0% saved)"
            if "saved" in line and "%" in line:
                parts = line.split()
                input_size = parts[1]
                output_size = parts[4]
                savings = line.split("(")[1].split("%")[0] + "%"
                return input_size, output_size, savings
    return "N/A", "N/A", "N/A"


def format_size(size_bytes: int) -> str:
    if size_bytes < 1024:
        return f"{size_bytes}B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f}KB"
    else:
        return f"{size_bytes / (1024 * 1024):.1f}MB"


def main() -> None:
    c = cfg()
    raw_path = Path(str(c["raw"]))
    out_path = Path(str(c["out"]))
    extensions: List[str] = c["extensions"]
    webp_quality = int(c["webp_quality"])

    # Header
    console.print(
        Panel.fit(
            "[bold blue]Image Compression Tool - WebP Conversion[/bold blue]",
            box=box.DOUBLE,
            border_style="blue",
        )
    )

    console.print(f"[dim]Working directory:[/dim] {Path.cwd()}")
    console.print(f"[dim]Source directory:[/dim] {raw_path}")
    console.print(f"[dim]Output directory:[/dim] {out_path}")
    console.print(f"[dim]WebP Quality:[/dim] {webp_quality}")
    console.print()

    # Find images
    with console.status("[bold green]Scanning for images...", spinner="dots"):
        imgs: List[Path] = list(
            chain.from_iterable(raw_path.rglob(f"*.{ext}") for ext in extensions)
        )

    if not imgs:
        console.print("[yellow]No images found to compress[/yellow]")
        return

    console.print(f"[green]Found {len(imgs)} images to convert to WebP[/green]")
    console.print()

    # Create results table
    table = Table(box=box.ROUNDED, border_style="green")
    table.add_column("File", style="cyan", no_wrap=False, width=40)
    table.add_column("Format", style="magenta", justify="center", width=12)
    table.add_column("Before", style="yellow", justify="right", width=10)
    table.add_column("After", style="green", justify="right", width=10)
    table.add_column("Savings", style="bold green", justify="center", width=10)
    table.add_column("Status", justify="center", width=8)

    # Process images with progress bar
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        TextColumn("[progress.percentage]{task.percentage:>3.0f}%"),
        TimeElapsedColumn(),
        console=console,
    ) as progress:
        task = progress.add_task("[green]Converting to WebP...", total=len(imgs))

        total_before = 0
        total_after = 0

        for src in imgs:
            dst: Path = out_path / src.relative_to(raw_path)
            original_format = src.suffix.upper()[1:]  # Remove the dot and uppercase

            progress.update(
                task, description=f"[green]Converting [cyan]{src.name}[/cyan]..."
            )

            try:
                size_before = src.stat().st_size
                total_before += size_before

                output = convert_to_webp(src, dst, webp_quality)

                # Get the actual WebP file that was created
                webp_file = dst.with_suffix(".webp")
                size_after = webp_file.stat().st_size
                total_after += size_after

                before_str, after_str, savings = parse_webp_stats(output)

                if savings == "N/A":
                    savings_pct = ((size_before - size_after) / size_before) * 100
                    savings = f"{savings_pct:.1f}%"

                table.add_row(
                    f"[cyan]{src.relative_to(raw_path)}[/cyan]",
                    f"[magenta]{original_format}→WEBP[/magenta]",
                    format_size(size_before),
                    format_size(size_after),
                    f"[bold green]{savings}[/bold green]",
                    "[green]OK[/green]",
                )

            except Exception as e:
                table.add_row(
                    f"[cyan]{src.relative_to(raw_path)}[/cyan]",
                    f"[magenta]{original_format}→WEBP[/magenta]",
                    "N/A",
                    "N/A",
                    "N/A",
                    "[red]FAIL[/red]",
                )
                console.print(f"[red]Error processing {src.name}: {e}[/red]")

            progress.advance(task)

    console.print()
    console.print(table)

    # Summary
    total_savings = total_before - total_after
    savings_pct = (total_savings / total_before) * 100 if total_before > 0 else 0

    summary = Panel(
        f"[bold green]WebP Conversion Complete[/bold green]\n\n"
        f"[cyan]Images processed:[/cyan] [bold]{len(imgs)}[/bold]\n"
        f"[cyan]Total size before:[/cyan] [bold]{format_size(total_before)}[/bold]\n"
        f"[cyan]Total size after:[/cyan] [bold]{format_size(total_after)}[/bold]\n"
        f"[cyan]Total savings:[/cyan] [bold green]{format_size(total_savings)} ({savings_pct:.1f}%)[/bold green]\n"
        f"[cyan]Output directory:[/cyan] [dim]{out_path}[/dim]",
        title="[bold blue]Summary[/bold blue]",
        box=box.ROUNDED,
        border_style="green",
    )

    console.print(summary)


if __name__ == "__main__":
    main()
