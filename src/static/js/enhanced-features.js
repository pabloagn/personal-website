// Enhanced markdown features
document.addEventListener("DOMContentLoaded", function () {
  // Wait for Prism to finish highlighting before adding our features
  setTimeout(function () {
    // Add copy buttons and line highlighting to code blocks
    const codeBlocks = document.querySelectorAll("pre code");

    codeBlocks.forEach(function (block) {
      const pre = block.parentElement;

      // Skip if already has header
      if (
        pre.previousElementSibling &&
        pre.previousElementSibling.classList.contains("code-header")
      ) {
        return;
      }

      // Create copy button
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

      // Create header for code block
      const header = document.createElement("div");
      header.className = "code-header";

      const language = block.className.match(/language-(\w+)/);
      const langDisplay = language ? language[1].toUpperCase() : "TXT";

      header.innerHTML = `<span>${langDisplay}</span>`;
      header.appendChild(button);

      pre.parentNode.insertBefore(header, pre);
      pre.style.borderRadius = "0 0 2px 2px";

      // Line highlighting setup
      pre.style.position = "relative";
      block.style.position = "relative";
      block.style.zIndex = "1";

      // Add data attribute for CSS
      pre.setAttribute("data-line-highlight", "false");

      // Calculate line metrics
      const lineHeight = parseFloat(window.getComputedStyle(block).lineHeight);
      const paddingTop = parseFloat(window.getComputedStyle(pre).paddingTop);

      // Create highlight background
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

          // Update position
          highlightBg.style.top = lineTop + "px";
          highlightBg.style.opacity = "1";

          // Set data attributes for CSS
          pre.setAttribute("data-line-highlight", "true");
          pre.style.setProperty("--highlight-line", lineNumber);
          pre.style.setProperty("--line-top", lineTop + "px");
          pre.style.setProperty("--line-height", lineHeight + "px");

          // Add class for styling
          pre.classList.add("has-line-highlight");
        }
      });

      pre.addEventListener("mouseleave", function () {
        highlightBg.style.opacity = "0";
        pre.setAttribute("data-line-highlight", "false");
        pre.classList.remove("has-line-highlight");
      });
    });

    // Add header anchors
    const headers = document.querySelectorAll(
      ".single-content h1, .single-content h2, .single-content h3, .single-content h4, .single-content h5, .single-content h6",
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

    // Create callouts from blockquotes
    const blockquotes = document.querySelectorAll("blockquote");

    blockquotes.forEach(function (blockquote) {
      const text = blockquote.textContent.trim();
      const calloutMatch = text.match(
        /^\[!(note|tip|warning|danger)\]\s*(.*?)$/m,
      );

      if (calloutMatch) {
        const type = calloutMatch[1];
        const title =
          calloutMatch[2] || type.charAt(0).toUpperCase() + type.slice(1);

        blockquote.className = `callout callout-${type}`;

        const titleElement = document.createElement("div");
        titleElement.className = "callout-title";

        const icons = {
          note: "◈",
          tip: "◇",
          warning: "◆",
          danger: "◉",
        };

        titleElement.innerHTML = `${icons[type]} ${title}`;

        const content = blockquote.innerHTML.replace(/\[!.*?\]\s*.*?<br>/, "");
        blockquote.innerHTML = content;
        blockquote.insertBefore(titleElement, blockquote.firstChild);
      }
    });

    // Add smooth scrolling
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

    // Generate enhanced tree-style TOC
    const content = document.querySelector(".single-content");
    if (!content) return;

    // Only include H1-H4
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
    tocToggle.innerHTML = "▼";
    tocToggle.title = "Toggle table of contents";

    tocHeader.appendChild(tocTitle);
    tocHeader.appendChild(tocToggle);
    toc.appendChild(tocHeader);

    const tocContent = document.createElement("div");
    tocContent.className = "toc-content";

    const tocList = document.createElement("div");
    tocList.className = "toc-tree";

    // Process headings and create flat list with proper connectors
    headings.forEach(function (heading, index) {
      const id = heading.id || `heading-${index}`;
      heading.id = id;
      
      const level = parseInt(heading.tagName.charAt(1));
      
      // Create TOC item
      const tocItem = document.createElement("div");
      tocItem.className = `toc-item toc-level-${level}`;
      
      // Create the link
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.className = "toc-link";
      
      // Determine if this is the last item at its level
      let isLast = true;
      for (let i = index + 1; i < headings.length; i++) {
        const nextLevel = parseInt(headings[i].tagName.charAt(1));
        if (nextLevel <= level) {
          isLast = nextLevel > level;
          break;
        }
      }
      
      const bulletSpan = document.createElement("span");
      bulletSpan.className = "toc-bullet";
      bulletSpan.textContent = "◆";
      
      const textSpan = document.createElement("span");
      textSpan.className = "toc-text";
      textSpan.textContent = heading.textContent.replace(/⑄|⑀/g, "").trim();
      
      // Create highlight background
      const highlightBg = document.createElement("div");
      highlightBg.className = "toc-highlight";
      
      // Assemble the link
      link.appendChild(bulletSpan);
      link.appendChild(textSpan);
      
      tocItem.appendChild(highlightBg);
      tocItem.appendChild(link);
      
      tocList.appendChild(tocItem);
    });

    tocContent.appendChild(tocList);
    toc.appendChild(tocContent);

    // Toggle functionality
    tocToggle.addEventListener("click", function () {
      tocContent.classList.toggle("collapsed");
      tocToggle.innerHTML = tocContent.classList.contains("collapsed")
        ? "▶"
        : "▼";
    });

    // Add hover effects
    const tocItems = toc.querySelectorAll(".toc-item");
    
    tocItems.forEach(item => {
      item.addEventListener("mouseenter", function() {
        // Highlight current item
        this.querySelector(".toc-highlight").style.opacity = "1";
        this.querySelector(".toc-bullet").style.opacity = "1";
        
        // Dim other items
        tocItems.forEach(otherItem => {
          if (otherItem !== this) {
            otherItem.style.opacity = "0.4";
          }
        });
      });
      
      item.addEventListener("mouseleave", function() {
        // Reset highlight
        this.querySelector(".toc-highlight").style.opacity = "0";
        this.querySelector(".toc-bullet").style.opacity = "0";
        
        // Reset opacity for all items
        tocItems.forEach(item => {
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
  }, 500);
});

// // Enhanced markdown features
// document.addEventListener("DOMContentLoaded", function () {
//   // Wait for Prism to finish highlighting before adding our features
//   setTimeout(function () {
//     // Add copy buttons and line highlighting to code blocks
//     const codeBlocks = document.querySelectorAll("pre code");
//
//     codeBlocks.forEach(function (block) {
//       const pre = block.parentElement;
//
//       // Skip if already has header
//       if (
//         pre.previousElementSibling &&
//         pre.previousElementSibling.classList.contains("code-header")
//       ) {
//         return;
//       }
//
//       // Create copy button
//       const button = document.createElement("button");
//       button.className = "copy-button";
//       button.textContent = "Yank";
//
//       button.addEventListener("click", function () {
//         navigator.clipboard.writeText(block.textContent).then(function () {
//           button.textContent = "Yanked!";
//           setTimeout(() => {
//             button.textContent = "Yank";
//           }, 2000);
//         });
//       });
//
//       // Create header for code block
//       const header = document.createElement("div");
//       header.className = "code-header";
//
//       const language = block.className.match(/language-(\w+)/);
//       const langDisplay = language ? language[1].toUpperCase() : "TXT";
//
//       header.innerHTML = `<span>${langDisplay}</span>`;
//       header.appendChild(button);
//
//       pre.parentNode.insertBefore(header, pre);
//       pre.style.borderRadius = "0 0 2px 2px";
//
//       // Line highlighting setup
//       pre.style.position = "relative";
//       block.style.position = "relative";
//       block.style.zIndex = "1";
//
//       // Add data attribute for CSS
//       pre.setAttribute("data-line-highlight", "false");
//
//       // Calculate line metrics
//       const lineHeight = parseFloat(window.getComputedStyle(block).lineHeight);
//       const paddingTop = parseFloat(window.getComputedStyle(pre).paddingTop);
//
//       // Create highlight background
//       const highlightBg = document.createElement("div");
//       highlightBg.className = "line-highlight-bg";
//       highlightBg.style.cssText = `
//         position: absolute;
//         left: 0;
//         right: 0;
//         height: ${lineHeight}px;
//         background: linear-gradient(90deg, transparent, rgba(127, 180, 202, 0.1) 10%, rgba(127, 180, 202, 0.1) 90%, transparent);
//         opacity: 0;
//         transition: opacity 0.2s ease, top 0.1s ease;
//         pointer-events: none;
//         z-index: 0;
//       `;
//       pre.appendChild(highlightBg);
//
//       pre.addEventListener("mousemove", function (e) {
//         const rect = pre.getBoundingClientRect();
//         const y = e.clientY - rect.top - paddingTop;
//
//         if (y >= 0 && y < block.offsetHeight) {
//           const lineNumber = Math.floor(y / lineHeight);
//           const lineTop = paddingTop + lineNumber * lineHeight;
//
//           // Update position
//           highlightBg.style.top = lineTop + "px";
//           highlightBg.style.opacity = "1";
//
//           // Set data attributes for CSS
//           pre.setAttribute("data-line-highlight", "true");
//           pre.style.setProperty("--highlight-line", lineNumber);
//           pre.style.setProperty("--line-top", lineTop + "px");
//           pre.style.setProperty("--line-height", lineHeight + "px");
//
//           // Add class for styling
//           pre.classList.add("has-line-highlight");
//         }
//       });
//
//       pre.addEventListener("mouseleave", function () {
//         highlightBg.style.opacity = "0";
//         pre.setAttribute("data-line-highlight", "false");
//         pre.classList.remove("has-line-highlight");
//       });
//     });
//
//     // Rest of your code remains the same...
//     // Add header anchors
//     const headers = document.querySelectorAll(
//       ".single-content h1, .single-content h2, .single-content h3, .single-content h4, .single-content h5, .single-content h6",
//     );
//
//     headers.forEach(function (header) {
//       if (header.querySelector(".header-anchor")) return;
//
//       if (!header.id) {
//         header.id = header.textContent
//           .toLowerCase()
//           .replace(/[^\w\s-]/g, "")
//           .replace(/\s+/g, "-");
//       }
//
//       const anchor = document.createElement("a");
//       anchor.className = "header-anchor";
//       anchor.href = `#${header.id}`;
//       anchor.innerHTML = "⑄";
//       anchor.title = "Copy link to this section";
//
//       anchor.addEventListener("click", function (e) {
//         e.preventDefault();
//         const url =
//           window.location.origin +
//           window.location.pathname +
//           this.getAttribute("href");
//         navigator.clipboard.writeText(url).then(function () {
//           anchor.innerHTML = "⑀";
//           setTimeout(() => {
//             anchor.innerHTML = "⑄";
//           }, 2000);
//         });
//       });
//
//       header.appendChild(anchor);
//     });
//
//     // Create callouts from blockquotes
//     const blockquotes = document.querySelectorAll("blockquote");
//
//     blockquotes.forEach(function (blockquote) {
//       const text = blockquote.textContent.trim();
//       const calloutMatch = text.match(
//         /^\[!(note|tip|warning|danger)\]\s*(.*?)$/m,
//       );
//
//       if (calloutMatch) {
//         const type = calloutMatch[1];
//         const title =
//           calloutMatch[2] || type.charAt(0).toUpperCase() + type.slice(1);
//
//         blockquote.className = `callout callout-${type}`;
//
//         const titleElement = document.createElement("div");
//         titleElement.className = "callout-title";
//
//         const icons = {
//           note: "◈",
//           tip: "◇",
//           warning: "◆",
//           danger: "◉",
//         };
//
//         titleElement.innerHTML = `${icons[type]} ${title}`;
//
//         const content = blockquote.innerHTML.replace(/\[!.*?\]\s*.*?<br>/, "");
//         blockquote.innerHTML = content;
//         blockquote.insertBefore(titleElement, blockquote.firstChild);
//       }
//     });
//
//     // Add smooth scrolling
//     document.querySelectorAll('a[href^="#"]').forEach((link) => {
//       link.addEventListener("click", function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute("href"));
//         if (target) {
//           target.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         }
//       });
//     });
//
//     // Generate TOC
//     const content = document.querySelector(".single-content");
//     if (!content) return;
//
//     const headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
//     if (headings.length < 3) return;
//
//     if (content.querySelector(".toc")) return;
//
//     const toc = document.createElement("div");
//     toc.className = "toc";
//
//     const tocHeader = document.createElement("div");
//     tocHeader.className = "toc-header";
//
//     const tocTitle = document.createElement("div");
//     tocTitle.className = "toc-title";
//     tocTitle.textContent = "Table of Contents";
//
//     const tocToggle = document.createElement("button");
//     tocToggle.className = "toc-toggle";
//     tocToggle.innerHTML = "▼";
//     tocToggle.title = "Toggle table of contents";
//
//     tocHeader.appendChild(tocTitle);
//     tocHeader.appendChild(tocToggle);
//     toc.appendChild(tocHeader);
//
//     const tocContent = document.createElement("div");
//     tocContent.className = "toc-content";
//
//     const tocList = document.createElement("ul");
//
//     headings.forEach(function (heading, index) {
//       const id = heading.id || `heading-${index}`;
//       heading.id = id;
//
//       const listItem = document.createElement("li");
//       const level = parseInt(heading.tagName.charAt(1));
//       listItem.style.paddingLeft = `${(level - 1) * 1}rem`;
//
//       const link = document.createElement("a");
//       link.href = `#${id}`;
//       // Remove icons from TOC
//       link.textContent = heading.textContent.replace(/⑄|✓/g, "").trim();
//
//       listItem.appendChild(link);
//       tocList.appendChild(listItem);
//     });
//
//     tocContent.appendChild(tocList);
//     toc.appendChild(tocContent);
//
//     tocToggle.addEventListener("click", function () {
//       tocContent.classList.toggle("collapsed");
//       tocToggle.innerHTML = tocContent.classList.contains("collapsed")
//         ? "▶"
//         : "▼";
//     });
//
//     const firstParagraph = content.querySelector("p");
//     if (firstParagraph) {
//       firstParagraph.parentNode.insertBefore(toc, firstParagraph.nextSibling);
//     } else {
//       content.insertBefore(toc, content.firstChild);
//     }
//   }, 500);
// });
//
