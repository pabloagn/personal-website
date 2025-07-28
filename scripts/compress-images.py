#!/usr/bin/env python3
import subprocess, sys
from pathlib import Path

try:
    import toml
except ImportError:
    sys.exit("toml lib missing")


def cfg():
    root = Path(__file__).resolve().parent.parent
    c = toml.load(root / "image-compressor.toml")["settings"]
    return {
        "raw": (root / c["raw_dir"]).resolve(),
        "out": (root / c["compressed_dir"]).resolve(),
        "jpeg": c.get("jpeg_quality", 85),
        "png": c.get("png_level", 3),
    }


def ensure(p):
    p.parent.mkdir(parents=True, exist_ok=True)


def cp(src, dst):
    subprocess.run(["cp", "--reflink=auto", src, dst], check=True)


def jpeg(src, dst, q):
    ensure(dst)
    cp(src, dst)
    subprocess.run(["jpegoptim", f"--max={q}", "--strip-all", str(dst)], check=True)


def png(src, dst, lvl):
    ensure(dst)
    cp(src, dst)
    subprocess.run(["oxipng", f"-o{lvl}", "--strip", "all", str(dst)], check=True)


def main():
    c = cfg()
    imgs = list(c["raw"].rglob("*.[jJ][pP][eE]*")) + list(c["raw"].rglob("*.png"))
    if not imgs:
        print("no images")
        return
    for src in imgs:
        dst = c["out"] / src.relative_to(c["raw"])
        (jpeg if src.suffix.lower() in (".jpg", ".jpeg") else png)(
            src, dst, c["jpeg"] if src.suffix.lower().startswith(".j") else c["png"]
        )
    print(f"compressed {len(imgs)} images → {c['out']}")


if __name__ == "__main__":
    main()
