
document.addEventListener("DOMContentLoaded", function () {
  const bracketContainer = document.getElementById("bracket");
  const generateBtn = document.getElementById("generateBracket");

  // Protección con clave para admins
  generateBtn.addEventListener("click", function () {
    const pass = prompt("Ingrese la clave de administrador:");
    if (pass !== "admin123") {
      alert("Clave incorrecta.");
      return;
    }
    loadAndRenderBracket();
  });

  function loadAndRenderBracket() {
    const sheetURL = "https://spreadsheets.google.com/feeds/cells/1Y36V0_4cFq9tV33ElslyUBNgj-liEBLgLnKO_HurLkg/1/public/full?alt=json";

    fetch(sheetURL)
      .then(response => response.json())
      .then(data => {
        const entries = data.feed.entry;
        const teamNames = [];

        // Recorrer datos y extraer columna C (col = 3)
        for (let i = 0; i < entries.length; i++) {
          const cell = entries[i];
          if (cell.gs$cell.col == "3" && cell.gs$cell.row !== "1") {
            const name = cell.content.$t.trim();
            if (name) teamNames.push(name);
          }
        }

        // Mezclar aleatoriamente los equipos
        const shuffled = teamNames.sort(() => Math.random() - 0.5);

        // Mostrar el bracket
        renderBracket(shuffled);
      })
      .catch(error => {
        console.error("Error al cargar datos:", error);
        bracketContainer.innerHTML = "<p>Error al cargar el bracket.</p>";
      });
  }

  function renderBracket(teams) {
    bracketContainer.innerHTML = "";
    const ul = document.createElement("ul");
    ul.className = "bracket";

    for (let i = 0; i < teams.length; i += 2) {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="match">
          <span>${teams[i] || "BYE"}</span> vs <span>${teams[i + 1] || "BYE"}</span>
        </div>
      `;
      ul.appendChild(li);
    }

    bracketContainer.appendChild(ul);
  }
});
