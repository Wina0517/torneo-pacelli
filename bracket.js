document.addEventListener("DOMContentLoaded", function () {
  const bracketContainer = document.getElementById("bracket");
  const generateBtn = document.getElementById("genBtn");

  generateBtn.addEventListener("click", () => {
    const pass = prompt("Clave de administrador:");
    if (pass === "admin123") {
      bracketContainer.style.display = "block";
      loadBracket();
    } else {
      alert("Clave incorrecta.");
    }
  });

  function loadBracket() {
    fetch("equipos.json")
      .then(res => res.json())
      .then(data => {
        renderRound("Ronda 1 (16vos)", data.equipos);
        renderRound("Octavos de final", data.octavos);
        renderRound("Repechaje", data.repechaje);
        renderRound("Cuartos de final", data.cuartos);
        renderRound("Semifinal", data.semifinal);
        renderRound("Final", data.final);
        renderPodio(data.podio);
      })
      .catch(err => {
        console.error("Error al cargar los equipos:", err);
        bracketContainer.innerHTML = "<p>Error al cargar el bracket.</p>";
      });
  }

  function renderRound(title, teamList) {
    const section = document.createElement("div");
    const heading = document.createElement("h3");
    heading.innerText = title;
    section.appendChild(heading);

    const ul = document.createElement("ul");
    ul.className = "bracket";

    for (let i = 0; i < teamList.length; i += 2) {
      const li = document.createElement("li");
      const t1 = teamList[i] || "Por definir";
      const t2 = teamList[i + 1] || "Por definir";
      li.innerHTML = `<div class="match"><span>${t1}</span> vs <span>${t2}</span></div>`;
      ul.appendChild(li);
    }

    section.appendChild(ul);
    bracketContainer.appendChild(section);
  }

  function renderPodio(podio) {
    const section = document.createElement("div");
    section.className = "podio";
    const heading = document.createElement("h3");
    heading.innerText = "🥇 Podio del Torneo";
    section.appendChild(heading);

    const ul = document.createElement("ul");
    ul.className = "bracket";

    const oro = podio.oro || "Por definir";
    const plata = podio.plata || "Por definir";
    const bronce = podio.bronce || "Por definir";

    ul.innerHTML = `
      <li><div class="match"><span>🥇 ${oro}</span></div></li>
      <li><div class="match"><span>🥈 ${plata}</span></div></li>
      <li><div class="match"><span>🥉 ${bronce}</span></div></li>
    `;

    section.appendChild(ul);
    bracketContainer.appendChild(section);
  }
});