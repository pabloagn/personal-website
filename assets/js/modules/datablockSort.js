export function enableDatablockSort() {
  const tables = document.querySelectorAll(".datablock-table");
  tables.forEach((table) => {
    const headers = table.querySelectorAll("thead th");
    headers.forEach((th, i) => {
      th.style.cursor = "pointer";
      th.addEventListener("click", () => {
        const rows = Array.from(table.querySelectorAll("tbody tr"));
        const asc = !th.classList.contains("sorted-asc");
        headers.forEach((h) => h.classList.remove("sorted-asc", "sorted-desc"));
        th.classList.add(asc ? "sorted-asc" : "sorted-desc");
        rows.sort((a, b) => {
          const tda = a.children[i].textContent;
          const tdb = b.children[i].textContent;
          const valA = parseFloat(tda) || tda;
          const valB = parseFloat(tdb) || tdb;
          return asc ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
        });
        rows.forEach((row) => table.querySelector("tbody").appendChild(row));
      });
    });
  });
}
