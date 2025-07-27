export function initTimelineLines() {
  const timelines = document.querySelectorAll(".timeline");

  timelines.forEach((timeline) => {
    const timelineLine = timeline.querySelector("::before") ? timeline : null;
    const bullets = timeline.querySelectorAll(".timeline-bullet");

    if (bullets.length === 0) return;

    const calculateLineHeight = () => {
      const firstBullet = bullets[0];
      const lastBullet = bullets[bullets.length - 1];

      // Get positions relative to timeline container
      const timelineRect = timeline.getBoundingClientRect();
      const firstRect = firstBullet.getBoundingClientRect();
      const lastRect = lastBullet.getBoundingClientRect();

      // Calculate bullet centers relative to timeline
      const firstCenter =
        firstRect.top - timelineRect.top + firstRect.height / 2;
      const lastCenter = lastRect.top - timelineRect.top + lastRect.height / 2;

      // Set CSS custom properties
      timeline.style.setProperty("--timeline-top", `${firstCenter}px`);
      timeline.style.setProperty(
        "--timeline-height",
        `${lastCenter - firstCenter}px`,
      );
    };

    // Calculate on load
    calculateLineHeight();

    // Recalculate on window resize
    window.addEventListener("resize", calculateLineHeight);
  });
}
