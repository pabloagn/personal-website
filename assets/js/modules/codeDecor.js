export function initCodeDecor() {
  document.addEventListener("DOMContentLoaded", setupCodeHeaders);

  if (document.readyState !== "loading") {
    setupCodeHeaders();
  }
}

function setupCodeHeaders() {
  const languageMap = {
    txt: "TXT",
    text: "TXT",
    output: "OUTPUT",
    plaintext: "TXT",
    console: "CONSOLE",
    terminal: "TERMINAL",
    fallback: "OUTPUT",
    nohighlight: "OUTPUT",
  };

  document.querySelectorAll(".highlight").forEach((highlightDiv) => {
    if (highlightDiv.querySelector(".code-header")) return;

    let codeEl = highlightDiv.querySelector("code");
    if (!codeEl) return;

    let lang = "text";

    if (highlightDiv.dataset.lang) {
      lang = highlightDiv.dataset.lang;
    }
    else if (
      highlightDiv.className &&
      highlightDiv.className.includes("language-")
    ) {
      const match = highlightDiv.className.match(/language-([a-zA-Z0-9-_]+)/);
      if (match) {
        lang = match[1];
      }
    }
    // Check code element classes
    else if (codeEl.className && codeEl.className.includes("language-")) {
      const match = codeEl.className.match(/language-([a-zA-Z0-9-_]+)/);
      if (match) {
        lang = match[1];
      }
    } else if (highlightDiv.className.includes("chroma")) {
      lang = "output";
    }

    const displayLang = languageMap[lang.toLowerCase()] || lang.toUpperCase();

    const header = document.createElement("div");
    header.className = "code-header";
    header.innerHTML = `<span>${displayLang}</span>`;

    const btn = document.createElement("button");
    btn.className = "copy-button btn btn--ghost btn--sm";
    btn.textContent = "Yank";
    btn.onclick = () => {
      navigator.clipboard.writeText(codeEl.textContent).then(() => {
        btn.textContent = "Yanked!";
        setTimeout(() => (btn.textContent = "Yank"), 2000);
      });
    };

    header.appendChild(btn);
    highlightDiv.prepend(header);
  });
}
