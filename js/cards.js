document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const btnPrev = document.querySelector(".carousel-btn.prev");
  const btnNext = document.querySelector(".carousel-btn.next");

  // Cartes factices
  const cards = [
    { id: "card001", name: "Algus rubra" },
    { id: "card002", name: "Bostrychia moritziana" },
    { id: "card003", name: "Ceramium tenuicorne" },
    { id: "card004", name: "Chondrus crispus" },
    { id: "card005", name: "Gracilaria verrucosa" }
  ];

  // Génération des cartes
  cards.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.innerHTML = `
      <div class="card-body">
        <h3>${card.name}</h3>
      </div>
    `;
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
    index = (index - 1 + totalCards) % totalCards; // boucle infinie
    updateCarousel();
  });

  updateCarousel();
});
