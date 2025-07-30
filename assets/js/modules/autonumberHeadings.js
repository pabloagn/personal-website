export function autonumberHeadings() {
  const content = document.querySelector(".single-content");
  const toc = document.querySelector(".toc-content");

  if (!content || !toc) return;

  // Track numbering levels
  const counters = [0, 0, 0, 0, 0]; // for h2 to h6

  // Map heading level to index in counters
  const getIndex = (tag) => parseInt(tag.charAt(1)) - 2;

  // === HEADINGS ===
  const headings = content.querySelectorAll("h2, h3, h4, h5, h6");

  headings.forEach((el) => {
    const level = getIndex(el.tagName.toLowerCase());

    // Reset lower levels
    for (let i = level + 1; i < counters.length; i++) counters[i] = 0;

    // Increment this level
    counters[level]++;

    // Build full number string
    const nums = counters
      .slice(0, level + 1)
      .filter((n) => n > 0)
      .join(".");

    // Prepend number to heading
    el.innerHTML = `${nums} ${el.innerHTML}`;

    // Update corresponding TOC entry
    const id = el.id;
    if (!id) return;

    const tocLink = toc.querySelector(`a[href="#${id}"]`);
    if (tocLink) {
      tocLink.innerHTML = `${nums} ${tocLink.innerHTML}`;
    }
  });
}
