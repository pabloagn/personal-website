import { throttle } from "../utils.js";

export function progressScroll() {
  const bar = document.querySelector(".scroll-indicator-bar");
  const border = document.querySelector(".glass-border");

  if (!bar || !border) return;

  // === CONFIGURABLE PARAMETERS ===
  const THROTTLE_MS = 20;
  const EASE_SPEED = 0.2; // Lower is smoother (e.g., 0.05–0.15)
  const COLOR_SPEED = 2.5; // Control how fast the gradient shifts

  let current = 0;

  const lerp = (start, end, t) => start + (end - start) * t;

  const updateProgress = () => {
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const target = Math.min(Math.max(window.scrollY / docHeight, 0), 1) * 100;

    current = lerp(current, target, EASE_SPEED);

    bar.style.width = `${current}%`;
    border.style.backgroundPosition = `${current * COLOR_SPEED}% 50%`;
  };

  window.addEventListener("scroll", throttle(updateProgress, THROTTLE_MS));
  updateProgress();
}
