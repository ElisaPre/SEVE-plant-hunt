document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const btnPrev = document.querySelector(".carousel-btn.prev");
  const btnNext = document.querySelector(".carousel-btn.next");

  // Cartes factices pour test
  const cards = [
    { id: "card001", name: "Plante 1" },
    { id: "card002", name: "Plante 2" },
    { id: "card003", name: "Plante 3" },
    { id: "card004", name: "Plante 4" }
  ];

  // Génération des cartes
  cards.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.textContent = card.name; // juste le nom
    track.appendChild(cardEl);
  });

  let index = 0;
  const totalCards = cards.length;

  function updateCarousel() {
    track.style.transform = `translateX(${-index * 100}%)`;
  }

  btnNext.addEventListener("click", () => {
    index = (index + 1) % totalCards; // boucle infinie
    updateCarousel();
  });

  btnPrev.addEventListener("click", () => {
    index = (index - 1 + totalCards) % totalCards;
    updateCarousel();
  });

  updateCarousel();
});
