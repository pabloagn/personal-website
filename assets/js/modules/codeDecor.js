export function initCodeDecor() {
  document.addEventListener('DOMContentLoaded', setupCodeHeaders);
  
  if (document.readyState !== 'loading') {
    setupCodeHeaders();
  }
}

function setupCodeHeaders() {
  document.querySelectorAll(".highlight").forEach(highlightDiv => {
    if (highlightDiv.querySelector(".code-header")) return;
    
    let codeEl = highlightDiv.querySelector("code");
    if (!codeEl) return;
    
    // Extract language from the code element's class (language-actionscript -> actionscript)
    let lang = 'text';
    if (codeEl.className) {
      const match = codeEl.className.match(/language-([a-zA-Z0-9]+)/);
      if (match) {
        lang = match[1];
      }
    }
    
    const header = document.createElement("div");
    header.className = "code-header";
    header.innerHTML = `<span>${lang.toUpperCase()}</span>`;
    
    const btn = document.createElement("button");
    btn.className = "copy-button";
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
