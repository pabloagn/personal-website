# Fix numbered headings like "## 1. Title" → "## Title"
python format_markdown.py path/to/content --fix-only numbering

# Remove bad markers like "##### **Code**" and "##### **Output**"
python format_markdown.py path/to/content --fix-only markers

# Remove bad horizontal rules (---) that are NOT frontmatter
python format_markdown.py path/to/content --fix-only hr

# Fix bad figure/table headers like "###### _Figure..." → "_Figure..."
python format_markdown.py path/to/content --fix-only figures

# Apply multiple fixes at once
python format_markdown.py path/to/content --fix-only numbering markers hr figures

