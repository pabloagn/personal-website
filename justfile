# Development commands for personal website

# Default recipe
default:
    @just --list

# Start development server
dev:
    hugo server --buildDrafts --buildFuture --disableFastRender --bind 0.0.0.0

# Build site for production  
build:
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

# Clean public directory
clean:
    rm -rf public/

# Format markdown files
fmt:
    find src/content -name "*.md" -exec prettier --write {} \;

# Serve production build locally
serve: build
    cd public && python3 -m http.server 8080
