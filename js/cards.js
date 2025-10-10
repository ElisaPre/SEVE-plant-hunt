document.addEventListener("DOMContentLoaded", async () => {
  const track = document.getElementById("carousel-track");
  const btnPrev = document.querySelector(".carousel-btn.prev");
  const btnNext = document.querySelector(".carousel-btn.next");

  try {
    // Charger le JSON
    const response = await fetch("cards.json");
    const cards = await response.json();

    // Générer les cartes
    cards.forEach(card => {
      const cardEl = document.createElement("div");
      cardEl.classList.add("card");
      cardEl.innerHTML = `
        <img src="${card.image}" alt="${card.name}">
        <div class="card-body">
          <h3>${card.name}</h3>
          <p>${card.description}</p>
        </div>
      `;
      cardEl.addEventListener("click", () => {
        window.location.href = `card.html?id=${card.id}`;
      });
      track.appendChild(cardEl);
    });

    // Variables pour le défilement
    let index = 0;
    const cardWidth = 270; // largeur + marge
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

  } catch (err) {
    console.error("Erreur chargement des cartes :", err);
  }
});
