export function enableTableOverflowFade() {
  const tables = document.querySelectorAll(".js-table-fade");

  tables.forEach((container) => {
    const scroll = container.querySelector(".table-scroll");
    const gradient = container.querySelector(".table-fade-gradient-right");
    if (!scroll || !gradient) return;

    const update = () => {
      const scrollable = scroll.scrollWidth > scroll.clientWidth;
      const atEnd = scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth - 1;

      gradient.style.display = scrollable ? "block" : "none";
      container.classList.toggle("hide-fade", atEnd);
    };

    scroll.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    update();
  });
}

