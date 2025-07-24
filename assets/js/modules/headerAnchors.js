// import { $ } from '../utils.js';
//
// export function initHeaderAnchors() {
//   $(".single-content h1, .single-content h2, .single-content h3, .single-content h4").forEach(h => {
//     if (h.querySelector(".header-anchor")) return;
//     h.id ||= h.textContent.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
//     const a = document.createElement("a");
//     a.className = "header-anchor";
//     a.href = `#${h.id}`;
//     a.textContent = "⑄";
//     a.title = "Copy link to this section";
//     a.onclick = e => {
//       e.preventDefault();
//       navigator.clipboard.writeText(`${location.origin}${location.pathname}#${h.id}`).then(() => {
//         a.textContent = "⑀";
//         setTimeout(() => (a.textContent = "⑄"), 2000);
//       });
//     };
//     h.append(a);
//   });
// }
