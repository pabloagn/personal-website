export function decorateHeader() {
  const container = document.querySelector(".single-content");
  if (!container) return;

  const h2s = container.querySelectorAll("h2");
  if (h2s.length <= 1) return;

  h2s.forEach((h2, index) => {
    if (index === 0) return;

    const line = document.createElement("div");
    line.className = "h2-divider";
    line.innerHTML = '<span></span><span>§</span><span></span>';
    h2.parentNode.insertBefore(line, h2);
  });
}
