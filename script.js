const heroes = {
  tank: [
    "d.va","doomfist","Domina","Junker_Queen","hazard","mauga","orisa","reinhardt","roadhog","ramattra",
    "sigma","winston","wrecking-ball","zarya"
  ],
  damage: [
    "Anran","ashe","bastion","cassidy","echo","emre","freja","genji","hanzo","junkrat",
    "mei","pharah","reaper","sojourn","soldier-76",
    "sombra","symmetra","torbjorn","tracer","Vendetta","Venture","widowmaker"
  ],
  support: [
    "ana","baptiste","brigitte","illari","Jetpack-Cat","kiriko","Lifeweaver","lucio",
    "mercy","Mizuki","moira","Wuyang","zenyatta"
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