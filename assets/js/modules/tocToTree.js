export function tocTotree() {
  const rootSelector = ".toc-content ul";
  const maxAttempts = 100;
  let attempts = 0;

  function tryRender() {
    const tocRoot = document.querySelector(rootSelector);
    if (!tocRoot) {
      if (++attempts < maxAttempts) {
        requestAnimationFrame(tryRender);
      }
      return;
    }

    // Prevent double-processing
    if (tocRoot.classList.contains("ascii-toc")) return;
    tocRoot.classList.add("ascii-toc");

    // Ensure no whitespace-only nodes interfere
    renderTree(tocRoot, "");
  }

  // function renderTree(ul, prefix) {
  //   const items = Array.from(ul.children).filter((el) => el.tagName === "LI");
  //
  //   items.forEach((li, i) => {
  //     const isLast = i === items.length - 1;
  //     const connector = isLast ? "└── " : "├── ";
  //     const nextPrefix = prefix + (isLast ? "    " : "│   ");
  //
  //     // Get direct child <a> (not nested in <p> or other wrappers)
  //     const link = li.querySelector(":scope > a");
  //     if (link) {
  //       const label = link.textContent.trim();
  //       // Preserve href, add styling
  //       // link.innerHTML = `<span class="ascii-prefix">${prefix}${connector}</span><span class="ascii-label">${label}</span>`;
  //
  //       link.innerHTML = `${prefix}${connector}<span class="ascii-label">${label}</span>`;
  //       link.classList.add("ascii-link");
  //       link.classList.add("ascii-line");
  //     }
  //
  //     // Process child list
  //     const childUl = li.querySelector(":scope > ul");
  //     if (childUl) {
  //       renderTree(childUl, nextPrefix);
  //     }
  //   });
  // }

  function renderTree(ul, depthMarkers = []) {
    const items = Array.from(ul.children).filter((el) => el.tagName === "LI");

    items.forEach((li, i) => {
      const isLast = i === items.length - 1;

      // Build prefix from depth markers
      let prefix = "";
      for (const isParentLast of depthMarkers) {
        prefix += isParentLast ? "    " : "│   ";
      }
      prefix += isLast ? "└── " : "├── ";

      // Replace the <a> with a full-width line
      const link = li.querySelector(":scope > a");
      if (link) {
        const label = link.textContent.trim();
        const href = link.getAttribute("href");

        const line = document.createElement("a");
        line.href = href;
        line.className = "ascii-line";
        line.innerHTML = `<span class="ascii-prefix">${prefix}</span><span class="ascii-label">${label}</span>`;

        link.replaceWith(line);
      }

      const childUl = li.querySelector(":scope > ul");
      if (childUl) {
        renderTree(childUl, [...depthMarkers, isLast]);
      }
    });
  }

  // Start attempt loop
  requestAnimationFrame(tryRender);
}
