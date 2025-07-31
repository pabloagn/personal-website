export function enableTocFadeEffect() {
  const wrappers = document.querySelectorAll(".js-toc-fade");

  wrappers.forEach((wrapper) => {
    const content = wrapper.querySelector(".toc-content");
    const fade = wrapper.querySelector(".toc-fade-bottom");

    if (!content || !fade) return;

    const update = () => {
      const scrollable = content.scrollHeight > content.clientHeight;
      const atBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 1;

      fade.style.display = scrollable ? "block" : "none";
      wrapper.classList.toggle("hide-fade", atBottom);
    };

    content.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    update();
  });
}

document.addEventListener("DOMContentLoaded", enableTocFadeEffect);

