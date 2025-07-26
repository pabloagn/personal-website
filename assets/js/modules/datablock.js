document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.datablock-table th').forEach((th, colIndex) => {
    th.addEventListener('click', () => {
      const table = th.closest('table');
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));

      const isAsc = th.classList.contains('sorted-asc');

      table.querySelectorAll('th').forEach(header => {
        header.classList.remove('sorted-asc', 'sorted-desc');
      });

      th.classList.add(isAsc ? 'sorted-desc' : 'sorted-asc');

      rows.sort((a, b) => {
        const aText = a.children[colIndex].textContent.trim();
        const bText = b.children[colIndex].textContent.trim();
        return (isAsc ? -1 : 1) * aText.localeCompare(bText, undefined, { numeric: true });
      });

      rows.forEach(row => tbody.appendChild(row));
    });
  });
});

