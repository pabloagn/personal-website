document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.querySelectorAll("pre").forEach((pre) => {
      if (!pre.classList.contains("line-numbers")) {
        pre.classList.add("line-numbers");
      }
      if (!pre.parentElement.classList.contains("highlight")) {
        const highlight = document.createElement("div");
        highlight.className = "highlight";
        pre.parentNode.insertBefore(highlight, pre);
        highlight.appendChild(pre);
      }
    });

    Prism.highlightAll();

    document.querySelectorAll(".highlight").forEach(function (highlightDiv) {
      const pre = highlightDiv.querySelector("pre");
      const block = highlightDiv.querySelector("pre code");

      if (!pre || !block) return;
      if (highlightDiv.querySelector(".code-header")) return;

      const button = document.createElement("button");
      button.className = "copy-button";
      button.textContent = "Yank";

      button.addEventListener("click", function () {
        navigator.clipboard.writeText(block.textContent).then(function () {
          button.textContent = "Yanked!";
          setTimeout(() => {
            button.textContent = "Yank";
          }, 2000);
        });
      });

      const header = document.createElement("div");
      header.className = "code-header";

      const language = block.className.match(/language-(\w+)/);
      const langDisplay = language ? language[1].toUpperCase() : "TXT";

      header.innerHTML = `<span>${langDisplay}</span>`;
      header.appendChild(button);

      highlightDiv.insertBefore(header, pre);
      pre.style.borderRadius = "0 0 2px 2px";

      pre.style.position = "relative";
      block.style.position = "relative";
      block.style.zIndex = "1";

      const lineHeight = parseFloat(window.getComputedStyle(block).lineHeight);
      const paddingTop = parseFloat(window.getComputedStyle(pre).paddingTop);

      const highlightBg = document.createElement("div");
      highlightBg.className = "line-highlight-bg";
      highlightBg.style.cssText = `
        position: absolute;
        left: 0;
        right: 0;
        height: ${lineHeight}px;
        background: linear-gradient(90deg, transparent, rgba(127, 180, 202, 0.1) 10%, rgba(127, 180, 202, 0.1) 90%, transparent);
        opacity: 0;
        transition: opacity 0.2s ease, top 0.1s ease;
        pointer-events: none;
        z-index: 0;
      `;
      pre.appendChild(highlightBg);

      pre.addEventListener("mousemove", function (e) {
        const rect = pre.getBoundingClientRect();
        const y = e.clientY - rect.top - paddingTop;

        if (y >= 0 && y < block.offsetHeight) {
          const lineNumber = Math.floor(y / lineHeight);
          const lineTop = paddingTop + lineNumber * lineHeight;
          highlightBg.style.top = lineTop + "px";
          highlightBg.style.opacity = "1";
        }
      });

      pre.addEventListener("mouseleave", function () {
        highlightBg.style.opacity = "0";
      });
    });

    const headers = document.querySelectorAll(
      ".single-content h1, .single-content h2, .single-content h3, .single-content h4, .single-content h5, .single-content h6"
    );

    headers.forEach(function (header) {
      if (header.querySelector(".header-anchor")) return;

      if (!header.id) {
        header.id = header.textContent
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
      }

      const anchor = document.createElement("a");
      anchor.className = "header-anchor";
      anchor.href = `#${header.id}`;
      anchor.innerHTML = "⑄";
      anchor.title = "Copy link to this section";

      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const url =
          window.location.origin +
          window.location.pathname +
          this.getAttribute("href");
        navigator.clipboard.writeText(url).then(function () {
          anchor.innerHTML = "⑀";
          setTimeout(() => {
            anchor.innerHTML = "⑄";
          }, 2000);
        });
      });

      header.appendChild(anchor);
    });

    const blockquotes = document.querySelectorAll("blockquote");

    blockquotes.forEach(function (blockquote) {
      const firstPara = blockquote.querySelector("p");
      if (!firstPara) return;

      const text = firstPara.textContent.trim();
      const calloutMatch = text.match(
        /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|DANGER)\]\s*/i
      );

      if (calloutMatch) {
        const type = calloutMatch[1].toLowerCase();
        const titleText = calloutMatch[1];

        blockquote.className = `callout callout-${type}`;

        const titleElement = document.createElement("div");
        titleElement.className = "callout-title";

        const icons = {
          note: "◈",
          tip: "◇",
          important: "◆",
          warning: "◉",
          caution: "!",
          danger: "!",
        };

        titleElement.innerHTML = `${icons[type]} ${titleText}`;

        firstPara.innerHTML = firstPara.innerHTML.replace(
          /^\[!.*?\]\s*/i,
          ""
        );

        blockquote.insertBefore(titleElement, firstPara);
      }
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    const content = document.querySelector(".single-content");
    if (!content) return;

    const headings = content.querySelectorAll("h1, h2, h3, h4");
    if (headings.length < 3) return;

    if (content.querySelector(".toc")) return;

    const toc = document.createElement("div");
    toc.className = "toc";

    const tocHeader = document.createElement("div");
    tocHeader.className = "toc-header";

    const tocTitle = document.createElement("div");
    tocTitle.className = "toc-title";
    tocTitle.textContent = "Table of Contents";

    const tocToggle = document.createElement("button");
    tocToggle.className = "toc-toggle";
    tocToggle.innerHTML = "⌾";
    tocToggle.title = "Toggle table of contents";

    tocHeader.appendChild(tocTitle);
    tocHeader.appendChild(tocToggle);
    toc.appendChild(tocHeader);

    const tocContent = document.createElement("div");
    tocContent.className = "toc-content";

    const tocList = document.createElement("div");
    tocList.className = "toc-tree";

    headings.forEach(function (heading, index) {
      const id = heading.id || `heading-${index}`;
      heading.id = id;

      const level = parseInt(heading.tagName.charAt(1));

      const tocItem = document.createElement("div");
      tocItem.className = `toc-item toc-level-${level}`;

      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.className = "toc-link";

      const bulletSpan = document.createElement("span");
      bulletSpan.className = "toc-bullet";
      bulletSpan.textContent = "◆";

      const textSpan = document.createElement("span");
      textSpan.className = "toc-text";
      textSpan.textContent = heading.textContent.replace(/⑄|⑀/g, "").trim();

      const highlightBg = document.createElement("div");
      highlightBg.className = "toc-highlight";

      link.appendChild(bulletSpan);
      link.appendChild(textSpan);

      tocItem.appendChild(highlightBg);
      tocItem.appendChild(link);

      tocList.appendChild(tocItem);
    });

    tocContent.appendChild(tocList);
    toc.appendChild(tocContent);

    tocToggle.addEventListener("click", function () {
      tocContent.classList.toggle("collapsed");
      tocToggle.innerHTML = tocContent.classList.contains("collapsed")
        ? "●"
        : "⌾";
    });

    const tocItems = toc.querySelectorAll(".toc-item");

    tocItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.querySelector(".toc-highlight").style.opacity = "1";
        this.querySelector(".toc-bullet").style.opacity = "1";

        tocItems.forEach((otherItem) => {
          if (otherItem !== this) {
            otherItem.style.opacity = "0.4";
          }
        });
      });

      item.addEventListener("mouseleave", function () {
        this.querySelector(".toc-highlight").style.opacity = "0";
        this.querySelector(".toc-bullet").style.opacity = "0";

        tocItems.forEach((item) => {
          item.style.opacity = "1";
        });
      });
    });

    const firstParagraph = content.querySelector("p");
    if (firstParagraph) {
      firstParagraph.parentNode.insertBefore(toc, firstParagraph.nextSibling);
    } else {
      content.insertBefore(toc, content.firstChild);
    }
  }, 100);
});
