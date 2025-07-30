# --- Global Settings & Variables ---
set shell       := ["bash", "-eu", "-o", "pipefail", "-c"]
set export      := true # keep env vars for subprocesses
set dotenv-load := true # automatically load .env if present

# --- Core Commands ---
HUGO        := "hugo"

# --- Core Paths ---
PUBLIC_DIR  := "public"
CONFIG_DIR  := "config"
CONTENT_DIR := "content"
RES_DIR     := "resources"
ASSET_DIR   := "assets"
NODE_BIN    := "npm"

# --- Hugo Flags ---
HUGO_FLAGS  := "--ignoreCache --noHTTPCache"
DEV_FLAGS   := "--buildDrafts --buildFuture --disableFastRender --bind 0.0.0.0"

# --- Recipes ---
# Default: list available commands
default:
    @just --list --unsorted

# Create: New blog post
post title:
    {{HUGO}} new {{CONTENT_DIR}}/blog/{{title}}.md

# Create: New deep dive
deepdive title:
    {{HUGO}} new {{CONTENT_DIR}}/deepdives/{{title}}.md

# Create: New project
project title:
    {{HUGO}} new {{CONTENT_DIR}}/projects/{{title}}.md

# Production server
prod:
    @echo "Starting development server..."
    {{HUGO}} server {{HUGO_FLAGS}}

# Development server
dev:
    @echo "Starting development server..."
    {{HUGO}} server {{DEV_FLAGS}} {{HUGO_FLAGS}}

# Production build
build: clean-assets
    @echo "Building production bundle..."
    {{HUGO}} --minify --gc {{HUGO_FLAGS}}

# Serve production build locally
serve: build
    cd {{PUBLIC_DIR}} && python3 -m http.server 8080

# Install JS/CSS dependencies
install-assets:
    {{NODE_BIN}} install

# Build JS/CSS assets
build-assets: install-assets
    {{NODE_BIN}} run build

# Watch JS/CSS assets
watch-assets: install-assets
    {{NODE_BIN}} run dev

# Clean generated assets and rebuild assets
clean-assets: clean
    @rm -rf {{RES_DIR}} {{PUBLIC_DIR}}
    @just build-assets

# Format markdown
fmt:
    prettier --write "{{CONTENT_DIR}}/**/*.md"

# Check for broken links
check: build
    htmlproofer {{PUBLIC_DIR}} --disable-external --checks link,script,img-http

# Template metrics
perf:
    {{HUGO}} --templateMetrics --templateMetricsHints

# Clean build artifacts
clean:
    @rm -rf {{PUBLIC_DIR}} {{RES_DIR}} .hugo_build.lock

# Full refresh
refresh: clean dev

# Test pre-commit hooks
hooks:
  @pre-commit run --all-files

# Deploy to GitHub Pages
deploy: build
    git subtree push --prefix {{PUBLIC_DIR}} origin gh-pages

# Site statistics
stats:
    @echo "Markdown files: $(find {{CONTENT_DIR}} -name '*.md' | wc -l)"
    @echo "Build size: $(du -sh {{PUBLIC_DIR}} 2>/dev/null || echo 'not built')"
