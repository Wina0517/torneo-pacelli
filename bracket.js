document.addEventListener("DOMContentLoaded", function () {
  const bracketContainer = document.getElementById("bracket");
  const generateBtn = document.getElementById("genBtn");
  const triangularBtn = document.getElementById("triangularBtn");

  let adminMode = false;

  generateBtn.addEventListener("click", () => {
    const pass = prompt("Clave de administrador:");
    if (pass === "admin123") {
      adminMode = true;
      loadAndRenderBracket();
    } else {
      alert("Clave incorrecta.");
    }
  });

  function loadAndRenderBracket() {
    const sheetURL = "https://spreadsheets.google.com/feeds/cells/2PACX-1vTIQCUQtawppOnE0cS5yuhkH3tCw7NLz3G_DTlmyMtKyf076_nmHKMRR2CrfkUBCTLyq0ykW32sbVy6/1/public/full?alt=json";

    fetch(sheetURL)
      .then((res) => res.json())
      .then((data) => {
        const entries = data.feed.entry;
        const teams = {};
        const rounds = {
          1: [],
          2: [],
          3: [],
          4: [],
          podium: []
        };

        entries.forEach((cell) => {
          const col = parseInt(cell.gs$cell.col);
          const row = parseInt(cell.gs$cell.row);
          const value = cell.content.$t.trim();

          if (col === 3 && row !== 1) { // Columna C: Nombres de equipos
            teams[row] = value;
          }
          if (col === 12 && row !== 1) { // Columna L: Ganadores 1vos
            rounds[2].push(value);
          }
          if (col === 13 && row !== 1) { // Columna M: Ganadores Repechaje
            rounds[3].push(value);
          }
          if (col === 14 && row !== 1) { // Columna N: Ganadores Octavos
            rounds[4].push(value);
          }
          if (col === 16 && row !== 1) { // Columna P: 1er lugar
            rounds.podium.push("🥇 " + value);
          }
          if (col === 17 && row !== 1) { // Columna Q: 2do lugar
            rounds.podium.push("🥈 " + value);
          }
          if (col === 18 && row !== 1) { // Columna R: 3er lugar
            rounds.podium.push("🥉 " + value);
          }
        });

        const teamNames = Object.values(teams);
        if (teamNames.length < 1) {
          bracketContainer.innerHTML = "<p>No hay equipos inscritos aún.</p>";
          return;
        }

        // Fase 1 siempre visible
        renderRound("Ronda 1", teamNames);

        // Mostrar fases siguientes si hay datos o si es vista admin
        if (adminMode || rounds[2].length > 0) renderRound("Octavos", rounds[2]);
        if (adminMode || rounds[3].length > 0) renderRound("Cuartos", rounds[3]);
        if (adminMode || rounds[4].length > 0) renderRound("Semifinal", rounds[4]);
        if (adminMode || rounds.podium.length > 0) renderRound("Ganadores", rounds.podium);

        if (rounds[4].length === 3 || adminMode) {
          triangularBtn.style.display = "block";
        }
      })
      .catch((err) => {
        console.error("Error al cargar la hoja:", err);
        bracketContainer.innerHTML = "<p>Error al cargar el bracket.</p>";
      });
  }

  function renderRound(title, teamList) {
    const section = document.createElement("div");
    section.className = "round-block";
    const heading = document.createElement("h3");
    heading.innerText = title;
    section.appendChild(heading);

    const ul = document.createElement("ul");
    ul.className = "bracket";
    for (let i = 0; i < teamList.length; i += 2) {
      const li = document.createElement("li");
      const team1 = teamList[i] || "Por definir";
      const team2 = teamList[i + 1] || "Por definir";
      li.innerHTML = `<div class="match"><span>${team1}</span> vs <span>${team2}</span></div>`;
      ul.appendChild(li);
    }

    section.appendChild(ul);
    bracketContainer.appendChild(section);
  }
});