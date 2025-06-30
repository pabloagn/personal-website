# Development commands for personal website

# Default recipe
default:
    @just --list

# Start development server
dev:
    hugo server --buildDrafts --buildFuture --disableFastRender

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

# Deploy to production (customize as needed)
deploy: build
    rsync -avz --delete public/ user@server:/path/to/site/

# Format and lint
fmt:
    find . -name "*.md" -exec prettier --write {} \;

# Check links
check:
    htmlproofer public/ --disable-external
