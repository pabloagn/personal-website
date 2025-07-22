export function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  };
}

const cache = new Map();
export function $(sel) {
  if (!cache.has(sel)) {
    cache.set(sel, document.querySelectorAll(sel));
  }
  return cache.get(sel);
}
