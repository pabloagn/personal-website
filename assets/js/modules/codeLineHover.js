export function initCodeLineHover() {
  document.addEventListener('DOMContentLoaded', setupCodeLineHover);
  
  if (document.readyState !== 'loading') {
    setupCodeLineHover();
  }
}

function setupCodeLineHover() {
  document.querySelectorAll('.highlight pre').forEach(pre => {
    const code = pre.querySelector('code');
    if (!code) return;
    
    const block = pre.closest('.highlight');
    if (!block) return;
    
    // Add line-by-line hover capability
    wrapCodeLines(code);
    
    const header = block.querySelector('.code-header');
    
    if (header) {
      // Header hover handlers
      header.addEventListener('mouseenter', () => {
        block.classList.add('header-hovered');
        block.classList.remove('is-hovered');
      });
      
      header.addEventListener('mouseleave', () => {
        block.classList.remove('header-hovered');
      });
      
      // Code area hover handlers
      pre.addEventListener('mouseenter', () => {
        block.classList.add('is-hovered');
        block.classList.remove('header-hovered');
      });
      
      pre.addEventListener('mouseleave', () => {
        block.classList.remove('is-hovered');
      });
      
      // Block-level mouseleave to clean up
      block.addEventListener('mouseleave', () => {
        block.classList.remove('is-hovered', 'header-hovered');
      });
    }
  });
}

function wrapCodeLines(code) {
  if (code.dataset.wrapped === 'true') return;        // already processed?

  const fragment = document.createDocumentFragment();
  const lines     = code.innerHTML.trimEnd().split('\n');

  lines.forEach((line, i) => {
    // skip the trailing blank line some highlighters add
    if (i === lines.length - 1 && line.trim() === '') return;

    const span = document.createElement('span');      // <-- phrasing element
    span.className = 'code-line';
    span.innerHTML = line || ' ';                     // preserve empty lines
    fragment.appendChild(span);
    // fragment.appendChild(document.createTextNode('\n'));  // normal line break
  });

  code.innerHTML = '';
  code.appendChild(fragment);
  code.dataset.wrapped = 'true';
}
