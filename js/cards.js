document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  // Liste des plantes avec pages associées
  const cards = [
    { name: "Plante 1", page: "plantes/agave.html", image: "Agave.png" },
    { name: "Plante 2", page: "plantes/Arbre-de-Judee.html", image: "Arbre de Judée.png" },
    { name: "Plante 3", page: "plantes/Cypres-vert.html", image: "Cyprès vert.png" },
    { name: "Plante 4", page: "plantes/Faux-poivrier.html", image: "Faux poivrier.png" },
    { name: "Plante 5", page: "plantes/Figuier-de-barbarie.html", image: "Figuier de barbarie.png" },
    { name: "Plante 6", page: "plantes/Genevrier.html", image: "Genevrier.png" },
    { name: "Plante 7", page: "plantes/Laurier-sauce.html", image: "Laurier-sauce.png" },
    { name: "Plante 8", page: "plantes/Lilas-des-Indes.html", image: "Lilas des Indes.png" },
    { name: "Plante 9", page: "plantes/Magnolia.html", image: "Magnolia.png" },
    { name: "Plante 10", page: "plantes/plante5.html", image: "Olivier.png" },
    { name: "Plante 11", page: "plantes/plante5.html", image: "Pin parasol.png" },
    { name: "Plante 12", page: "plantes/plante5.html", image: "Sumac de Virginie.png" },
    { name: "Plante 13", page: "plantes/plante5.html", image: "Vigne.png" },
    { name: "Plante 14", page: "plantes/plante5.html", image: "Yucca.png" }
  ];

  // Génération des cartes
  cards.forEach(cardData => {
    const card = document.createElement("div");
    card.className = "card";

    // Image
    const img = document.createElement("img");
    img.src = cardData.image;
    img.alt = cardData.name;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover"; // couvre toute la carte
    img.style.borderRadius = "12px";

    card.appendChild(img);

    // Clique → redirige vers la page correspondante
    card.addEventListener("click", () => {
      window.location.href = cardData.page;
    });

    track.appendChild(card);
  });

  const cardElements = Array.from(track.children);
  let currentIndex = 0;

  function updateCarousel() {
    const cardWidth = cardElements[0].offsetWidth + 20; // largeur dynamique
    cardElements.forEach((card, index) => {
      const offset = index - currentIndex;

      if (offset === 0) {
        // Carte centrale
        card.style.transform = `translateX(-50%) scale(1)`;
        card.style.opacity = "1";
        card.style.filter = "blur(0px)";
        card.style.zIndex = "3";
      } else if (offset === -1) {
        // Carte gauche
        card.style.transform = `translateX(calc(-${cardWidth}px - 50%)) scale(0.9)`;
        card.style.opacity = "0.6";
        card.style.filter = "blur(3px)";
        card.style.zIndex = "2";
      } else if (offset === 1) {
        // Carte droite
        card.style.transform = `translateX(calc(${cardWidth}px - 50%)) scale(0.9)`;
        card.style.opacity = "0.6";
        card.style.filter = "blur(3px)";
        card.style.zIndex = "2";
      } else {
        // Les autres cartes derrière
        card.style.transform = `translateX(0) scale(0.8)`;
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
