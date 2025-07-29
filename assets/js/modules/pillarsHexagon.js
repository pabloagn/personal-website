import { $ } from "../utils.js";

export function initHexagonPillars() {
  const svg = document.querySelector(".pillars-diagram");
  if (!svg) return;

  // Start pulsing immediately and continuously
  startPulseSequence();
  const interval = setInterval(startPulseSequence, 2000);

  function startPulseSequence() {
    // Clear previous animations
    svg.querySelectorAll(".is-pulsing").forEach((el) => {
      el.classList.remove("is-pulsing");
    });

    // Force reflow
    void svg.offsetWidth;

    // Start center circle immediately
    setTimeout(() => {
      const centerCircle = svg.querySelector(".central-circle");
      if (centerCircle) {
        centerCircle.classList.add("is-pulsing");
      }
    }, 10);

    // Hexagon
    setTimeout(() => {
      svg.querySelectorAll(".central-hexagon").forEach((line) => {
        line.classList.add("is-pulsing");
      });
    }, 300);

    // Lines after 300ms
    setTimeout(() => {
      svg.querySelectorAll(".node-line").forEach((line) => {
        line.classList.add("is-pulsing");
      });
    }, 600);

    // Node circles after 600ms
    setTimeout(() => {
      svg.querySelectorAll(".pillar-node circle").forEach((circle) => {
        circle.classList.add("is-pulsing");
      });
    }, 900);
  }
}
