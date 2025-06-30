# Development commands for Hugo blog

# Default recipe
default:
    @just --list

# Start development server with cleared cache
dev:
    @echo "Clearing cache and starting development server..."
    @rm -rf public/
    @rm -rf resources/
    hugo server --buildDrafts --buildFuture --disableFastRender --bind 0.0.0.0 --noHTTPCache --ignoreCache

# Build site for production  
build:
    @echo "Building site for production..."
    @rm -rf public/
    @rm -rf resources/
    hugo --minify --gc

# Create new blog post
post title:
    hugo new content/blog/{{title}}.md

# Create new deep dive
deepdive title:
    hugo new content/deepdives/{{title}}.md

# Create new project
project title:
    hugo new content/projects/{{title}}.md

# Clean all generated files and cache
clean:
    @echo "Cleaning all generated files..."
    @rm -rf public/
    @rm -rf resources/
    @rm -rf .hugo_build.lock

# Format markdown files
fmt:
    find src/content -name "*.md" -exec prettier --write {} \;

# Serve production build locally
serve: build
    cd public && python3 -m http.server 8080

# Hard refresh - clean everything and restart
refresh: clean dev

# Check for broken links (requires htmlproofer)
check:
    @echo "Checking for broken links..."
    htmlproofer public/ --disable-external --check-html --check-img-http

# Show site statistics
stats:
    @echo "Site statistics:"
    @echo "Posts: $(find src/content -name "*.md" | wc -l)"
    @echo "Size: $(du -sh public/ 2>/dev/null || echo "Not built")"
