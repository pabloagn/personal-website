export function initHeaderAnchors() {
  const headings = document.querySelectorAll("h1[id], h2[id], h3[id]");

  headings.forEach((heading) => {
    if (heading.querySelector(".header-anchor")) return;

    const id = heading.id;

    const anchor = document.createElement("a");
    anchor.className = "header-anchor";
    anchor.href = `#${id}`;
    anchor.setAttribute("aria-label", `Link to section: ${heading.textContent}`);
    anchor.innerHTML = `
      <svg class="anchor-icon" viewBox="0 0 8 8" width="12" height="12" fill="currentColor" aria-hidden="true">
        <circle cx="4" cy="4" r="3" />
      </svg>
    `;

    heading.prepend(anchor);
  });
}

