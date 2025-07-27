import { $ } from "../utils.js";

export function initCallouts() {
  const ICON = {
    note: "◈",
    tip: "◇",
    important: "◆",
    warning: "◉",
    caution: "⚠",
    danger: "⚠",
  };
  $(".single-content blockquote").forEach((bq) => {
    const p = bq.querySelector("p");
    if (!p) return;
    const match = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|DANGER)]\s*/i.exec(
      p.textContent.trim(),
    );
    if (!match) return;
    const type = match[1].toLowerCase();
    bq.className = `callout callout-${type}`;
    const titleDiv = document.createElement("div");
    titleDiv.className = "callout-title";
    titleDiv.innerHTML = `${ICON[type]} ${match[1].toUpperCase()}`;
    p.innerHTML = p.innerHTML.replace(/^\[!.*?]\s*/i, "");
    bq.insertBefore(titleDiv, p);
  });
}
