document.addEventListener("DOMContentLoaded", function () {
  const bracketContainer = document.getElementById("bracket");

  fetch("equipos.json")
    .then((res) => res.json())
    .then((data) => {
      const equipos = data.equipos;
      renderRound("Ronda 1", equipos);
    })
    .catch((err) => {
      console.error("Error al cargar los equipos:", err);
      bracketContainer.innerHTML = "<p>Error al cargar el bracket.</p>";
    });

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
});