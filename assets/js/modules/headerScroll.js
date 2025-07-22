import { throttle } from '../utils.js';

export function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  const scrollHandler = throttle(() => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, 10);
  
  window.addEventListener('scroll', scrollHandler, { passive: true });
}
