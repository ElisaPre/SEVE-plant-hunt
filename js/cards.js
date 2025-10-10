document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  // Exemple de cartes (remplace par tes vraies données)
  const cards = ["Plante 1", "Plante 2", "Plante 3", "Plante 4", "Plante 5"];

  // Génération des cartes
  cards.forEach(text => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = text;
    track.appendChild(card);
  });

  const cardElements = Array.from(track.children);
  let currentIndex = 0;

  function updateCarousel() {
    cardElements.forEach((card, index) => {
      const offset = index - currentIndex;

      if (offset === 0) {
        // Carte centrale
        card.style.transform = "translateX(0) scale(1)";
        card.style.opacity = "1";
        card.style.filter = "blur(0px)";
        card.style.zIndex = "3";
      } else if (offset === -1) {
        // Carte gauche
        card.style.transform = "translateX(-260px) scale(0.9)";
        card.style.opacity = "0.6";
        card.style.filter = "blur(3px)";
        card.style.zIndex = "2";
      } else if (offset === 1) {
        // Carte droite
        card.style.transform = "translateX(260px) scale(0.9)";
        card.style.opacity = "0.6";
        card.style.filter = "blur(3px)";
        card.style.zIndex = "2";
      } else {
        // Les autres cartes derrière
        card.style.transform = "translateX(0) scale(0.8)";
        card.style.opacity = "0";
        card.style.filter = "blur(5px)";
        card.style.zIndex = "1";
      }
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cardElements.length) % cardElements.length;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cardElements.length;
    updateCarousel();
  });

  // Init au chargement
  updateCarousel();
});
