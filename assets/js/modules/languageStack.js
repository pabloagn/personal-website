export function enableLanguageStackTooltips() {
  const stacks = document.querySelectorAll(".language-stack");

  stacks.forEach((stack) => {
    const segments = stack.querySelectorAll(".language-segment");

    segments.forEach((segment) => {
      // Skip if no title (no data)
      if (!segment.title) return;

      let tooltip;

      const showTooltip = () => {
        tooltip = document.createElement("div");
        tooltip.className = "lang-tooltip";
        tooltip.textContent = segment.title;
        tooltip.style.cssText = `
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #000;
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          z-index: 10;
          pointer-events: none;
        `;
        segment.appendChild(tooltip);
      };

      const hideTooltip = () => {
        if (tooltip) {
          tooltip.remove();
          tooltip = null;
        }
      };

      segment.addEventListener("mouseenter", showTooltip);
      segment.addEventListener("mouseleave", hideTooltip);
    });
  });
}
