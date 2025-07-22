import { $ } from '../utils.js';

export function initSmoothScroll() {
  $('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      try {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } catch (err) {
        console.warn('Smooth scroll failed for selector:', a.getAttribute("href"));
      }
    });
  });
}
