export function applyDropCap() {
  const paragraph = document.querySelector(".single-content > p:first-of-type");

  if (!paragraph) return;

  const existing = paragraph.querySelector(".drop-cap");
  if (existing) return;

  const text = paragraph.textContent.trim();
  if (!text || text.length < 2) return;

  const firstLetter = text[0];
  const rest = text.slice(1);

  paragraph.innerHTML = `
    <span class="drop-cap">${firstLetter}</span>${rest}
  `;
}
