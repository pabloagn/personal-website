import { throttle } from "../utils.js";

export function hamburgerMenu() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (!toggle || !menu) return;

  const TOGGLE_CLASS = "open";
  const THROTTLE_MS = 20;

  const toggleMenu = () => {
    menu.classList.toggle(TOGGLE_CLASS);
    toggle.classList.toggle(TOGGLE_CLASS);
  };

  toggle.addEventListener("click", throttle(toggleMenu, THROTTLE_MS));
}
