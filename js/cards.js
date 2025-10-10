document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const btnPrev = document.querySelector(".carousel-btn.prev");
  const btnNext = document.querySelector(".carousel-btn.next");

  // Cartes factices pour test
  const cards = [
    { id: "card001", name: "Plante 1" },
    { id: "card002", name: "Plante 2" },
    { id: "card003", name: "Plante 3" },
    { id: "card004", name: "Plante 4" },
    { id: "card005", name: "Plante 5" },
    { id: "card006", name: "Plante 6" }
  ];

  // Génération simple
  cards.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.innerHTML = `
      <div class="card-body">
        <h3>${card.name}</h3>
      </div>
    `;
    cardEl.addEventListener("click", () => {
      window.location.href = `card.html?id=${card.id}`;
    });
    track.appendChild(cardEl);
  });

  // Variables pour défilement
  let index = 0;
  const cardWidth = 270;
  const visibleCards = Math.floor(track.parentElement.offsetWidth / cardWidth);

  // Boutons
  btnPrev.addEventListener("click", () => {
    if (index > 0) {
      index--;
      track.style.transform = `translateX(${-index * cardWidth}px)`;
    }
  });

  btnNext.addEventListener("click", () => {
    if (index < cards.length - visibleCards) {
      index++;
      track.style.transform = `translateX(${-index * cardWidth}px)`;
    }
  });
});
