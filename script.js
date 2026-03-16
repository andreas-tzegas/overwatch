const heroes = {
  tank: [
    "D.Va","Doomfist","Domina","Junker_Queen","Hazard","Mauga","Orisa","reinhardt","Roadhog","Ramattra",
    "Sigma","Winston","Wrecking-Ball","Zarya"
  ],
  damage: [
    "Anran","Ashe","Bastion","cassidy","Echo","Emre","Freja","Genji","Hanzo","Junkrat",
    "Mei","pharah","Reaper","Sojourn","Soldier-76",
    "Sombra","Symmetra","torbjorn","tracer","Vendetta","Venture","Widowmaker"
  ],
  support: [
    "Ana","Baptiste","Brigitte","Illari","Jetpack-Cat","kiriko","Lifeweaver","lucio",
    "Mercy","Mizuki","Moira","Wuyang","Zenyatta"
  ]
};
let selectedHeroes = JSON.parse(localStorage.getItem("selectedHeroes")) || [];

function updateProgress() {
  let total = 0;
  let done = selectedHeroes.length;

  Object.keys(heroes).forEach(role => {
    const roleTotal = heroes[role].length;
    const roleDone = heroes[role].filter(h => selectedHeroes.includes(h)).length;

    document.getElementById(`${role}-progress`).textContent =
      `${roleDone} / ${roleTotal}`;

    total += roleTotal;
  });

  const percent = Math.round((done / total) * 100);
  document.getElementById("totalProgress").textContent = `${percent}%`;
}

function createHeroCard(name, container) {
  const card = document.createElement("div");
  card.classList.add("hero-card");
  card.dataset.name = name;

  const img = document.createElement("img");
  img.src = `images/${name}.webp`;
  img.alt = name;

  card.appendChild(img);

  if (selectedHeroes.includes(name)) {
    card.classList.add("selected");
  }

  card.addEventListener("click", () => {
    card.classList.toggle("selected");

    const index = selectedHeroes.indexOf(name);
    if (index > -1) {
      selectedHeroes.splice(index, 1);
    } else {
      selectedHeroes.push(name);
    }

    localStorage.setItem("selectedHeroes", JSON.stringify(selectedHeroes));
    updateProgress();
  });

  container.appendChild(card);
}

Object.keys(heroes).forEach(role => {
  const container = document.getElementById(role);
  heroes[role].forEach(hero => createHeroCard(hero, container));
});

document.getElementById("resetBtn").addEventListener("click", () => {
  selectedHeroes = [];
  localStorage.removeItem("selectedHeroes");
  document.querySelectorAll(".hero-card").forEach(card => {
    card.classList.remove("selected");
  });
  updateProgress();
});

updateProgress();