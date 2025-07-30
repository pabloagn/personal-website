#!/usr/bin/env bash

set -euo pipefail

# Go to the root of the project (from inside scripts/)
cd "$(dirname "$0")/.."

# Format all Markdown files in the content directory
find content -name "*.md" | while read -r file; do
  echo "Formatting $file"
  marksman format "$file"
done

