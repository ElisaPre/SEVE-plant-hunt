document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const btnPrev = document.querySelector(".carousel-btn.prev");
  const btnNext = document.querySelector(".carousel-btn.next");

  // Cartes test
  const cards = [
    { id: "card001", name: "Plante 1" },
    { id: "card002", name: "Plante 2" },
    { id: "card003", name: "Plante 3" },
    { id: "card004", name: "Plante 4" }
  ];

  // Génération
  cards.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.textContent = card.name;
    track.appendChild(cardEl);
  });

  // Clonage première + dernière pour effet loop
  const firstClone = track.firstElementChild.cloneNode(true);
  const lastClone = track.lastElementChild.cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstElementChild);

  const allCards = document.querySelectorAll(".card");
  let index = 1; // on commence sur la vraie 1ère carte
  const cardWidth = allCards[0].offsetWidth;

  track.style.transform = `translateX(${-cardWidth * index}px)`;

  function moveToIndex() {
    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }

  btnNext.addEventListener("click", () => {
    if (index >= allCards.length - 1) return;
    index++;
    moveToIndex();
  });

  btnPrev.addEventListener("click", () => {
    if (index <= 0) return;
    index--;
    moveToIndex();
  });

  track.addEventListener("transitionend", () => {
    if (allCards[index].textContent === "Plante 1" && index === allCards.length - 1) {
      track.style.transition = "none";
      index = 1;
      track.style.transform = `translateX(${-cardWidth * index}px)`;
    }
    if (allCards[index].textContent === "Plante 4" && index === 0) {
      track.style.transition = "none";
      index = allCards.length - 2;
      track.style.transform = `translateX(${-cardWidth * index}px)`;
    }
  });
});
