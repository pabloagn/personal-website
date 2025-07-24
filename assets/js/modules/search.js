let searchIndex = [];

async function fetchSearchData() {
  try {
    const res = await fetch("/index.json");
    searchIndex = await res.json();
  } catch (error) {
    console.error("Search index load failed:", error);
  }
}

function filterSearch(query) {
  const q = query.toLowerCase();
  return searchIndex.filter(item =>
    item.title?.toLowerCase().includes(q) ||
    item.summary?.toLowerCase().includes(q) ||
    item.content?.toLowerCase().includes(q) ||
    (item.tags || []).some(tag => tag.toLowerCase().includes(q)) ||
    (item.categories || []).some(cat => cat.toLowerCase().includes(q))
  );
}

function renderResults(results) {
  const ul = document.getElementById("search-results");
  ul.innerHTML = "";

  if (results.length === 0) {
    ul.innerHTML = '<li class="search-empty">No results found.</li>';
    return;
  }

  results.forEach(item => {
    const li = document.createElement("li");
    li.className = "search-result";
    li.innerHTML = `
      <a href="${item.permalink}">
        <h4>${item.title}</h4>
        <p>${item.summary}</p>
        <div class="tags">
          ${(item.tags || []).map(tag => `<span class="tag">${tag}</span>`).join(" ")}
        </div>
      </a>
    `;
    ul.appendChild(li);
  });
}

function openSearch() {
  const modal = document.getElementById("search-modal");
  modal.classList.remove("hidden");
  document.getElementById("search-input").focus();
}

function closeSearch() {
  document.getElementById("search-modal").classList.add("hidden");
}

function bindKeys() {
  document.addEventListener("keydown", e => {
    if ((e.key === "/" || (e.ctrlKey && e.key.toLowerCase() === "k")) && !e.target.closest("input, textarea")) {
      e.preventDefault();
      openSearch();
    } else if (e.key === "Escape") {
      closeSearch();
    }

    if (document.activeElement === document.getElementById("search-input")) {
      const links = Array.from(document.querySelectorAll(".search-result a"));
      const index = links.indexOf(document.activeElement);

      if (e.key === "j") {
        e.preventDefault();
        if (index < links.length - 1) links[index + 1].focus();
        else if (index === -1 && links.length > 0) links[0].focus();
      } else if (e.key === "k") {
        e.preventDefault();
        if (index > 0) links[index - 1].focus();
      }
    }
  });

  document.getElementById("search-input").addEventListener("input", e => {
    renderResults(filterSearch(e.target.value));
  });

  const trigger = document.getElementById("search-trigger");
  if (trigger) {
    trigger.addEventListener("click", openSearch);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchSearchData().then(bindKeys);
});
