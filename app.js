// js/app.js

// Références DOM
const authOverlay = document.getElementById('auth-overlay');
const btnSignup = document.getElementById('btn-signup');
const btnSignin = document.getElementById('btn-signin');
const btnSignout = document.getElementById('btn-signout');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');

let currentUser = null;
let cards = [];
let swiper = null;
let html5QrCodeInstance = null;
let currentCard = null;

// Auth handlers
btnSignup.addEventListener('click', async () => {
  const email = emailInput.value.trim();
  const pass = passInput.value;
  try {
    await auth.createUserWithEmailAndPassword(email, pass);
    alert('Inscrit !');
  } catch(err) { alert('Erreur signup: ' + err.message); }
});
btnSignin.addEventListener('click', async () => {
  const email = emailInput.value.trim();
  const pass = passInput.value;
  try {
    await auth.signInWithEmailAndPassword(email, pass);
  } catch(err) { alert('Erreur signin: ' + err.message); }
});
btnSignout.addEventListener('click', () => auth.signOut());

// Observateur état auth
auth.onAuthStateChanged(async (user) => {
  currentUser = user;
  if (user) {
    authOverlay.style.display = 'none';
    await initApp();
  } else {
    authOverlay.style.display = 'flex';
  }
});

// Initialisation app: charger cartes, initialiser swiper
async function initApp(){
  // Charger cards.json
  const res = await fetch('cards.json');
  cards = await res.json();

  // Choisir index aléatoire pour première carte (chaque utilisateur peut voir une carte différente)
  const startIndex = Math.floor(Math.random() * cards.length);

  // Injecter slides
  const wrapper = document.getElementById('cards-wrapper');
  wrapper.innerHTML = '';
  cards.forEach(card => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <div class="card" data-id="${card.id}">
        <img src="${card.image}" alt="${card.name}" />
        <h4>${card.name}</h4>
        <div class="badge captured hidden">✔</div>
      </div>`;
    slide.querySelector('.card').addEventListener('click', () => openCard(card));
    wrapper.appendChild(slide);
  });

  // Init Swiper
  if (swiper) swiper.destroy();
  swiper = new Swiper('.swiper-container', {
    initialSlide: startIndex,
    loop: false,
    pagination: { el: '.swiper-pagination' },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  });

  // Mettre à jour UI des cartes déjà capturées par l'utilisateur
  markCapturedCards();
}

// Fonction marquant cartes déjà capturées
async function markCapturedCards(){
  if (!currentUser) return;
  const snap = await db.collection('captures')
    .where('userId','==', currentUser.uid)
    .get();
  const capturedIds = new Set(snap.docs.map(d => d.data().cardId));
  document.querySelectorAll('.swiper-slide .card').forEach(el => {
    const id = el.dataset.id;
    if (capturedIds.has(id)) el.querySelector('.badge.captured').classList.remove('hidden');
  });
}

/* --- Modal / Scanner --- */

const modal = document.getElementById('card-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const btnStartScan = document.getElementById('btn-start-scan');
const btnStopScan = document.getElementById('btn-stop-scan');
const captureStatus = document.getElementById('capture-status');

closeModalBtn.addEventListener('click', () => {
  stopScanner();
  modal.classList.add('hidden');
});

function openCard(card){
  currentCard = card;
  modalImg.src = card.image;
  modalTitle.textContent = card.name;
  modalDesc.textContent = card.description;
  captureStatus.textContent = '';
  modal.classList.remove('hidden');
}

// Demarrer scanner (html5-qrcode)
btnStartScan.addEventListener('click', async () => {
  if (!currentUser) { alert('Connecte-toi d’abord'); return; }
  if (html5QrCodeInstance) return;
  const readerId = 'qr-reader';
  html5QrCodeInstance = new Html5Qrcode(readerId);

  const qrSuccess = async (decodedText, decodedResult) => {
    console.log('QR:', decodedText);
    if (decodedText === currentCard.qrValue) {
      await recordCapture(currentCard);
      captureStatus.textContent = 'QR valide — capturé ✅';
      stopScanner();
    } else {
      captureStatus.textContent = `QR non reconnu: ${decodedText}`;
    }
  };

  try {
    await html5QrCodeInstance.start(
      { facingMode: "environment" }, // camera arrière si possible
      { fps: 10, qrbox: 250 },
      qrSuccess
    );
    btnStartScan.classList.add('hidden');
    btnStopScan.classList.remove('hidden');
  } catch(err) {
    alert('Impossible d\'accéder à la caméra: ' + err);
  }
});

btnStopScan.addEventListener('click', () => stopScanner());

async function stopScanner(){
  if (!html5QrCodeInstance) return;
  try { await html5QrCodeInstance.stop(); } catch(e){ console.warn(e); }
  html5QrCodeInstance.clear();
  html5QrCodeInstance = null;
  btnStartScan.classList.remove('hidden');
  btnStopScan.classList.add('hidden');
}

// Enregistrer la capture dans Firestore
async function recordCapture(card){
  if (!currentUser) return;
  // Vérifier doublon
  const q = await db.collection('captures')
    .where('userId','==', currentUser.uid)
    .where('cardId','==', card.id)
    .get();
  if (!q.empty) {
    console.log('Déjà capturé');
    return;
  }
  await db.collection('captures').add({
    userId: currentUser.uid,
    userEmail: currentUser.email || null,
    cardId: card.id,
    cardName: card.name,
    qrValue: card.qrValue,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  // mettre à jour UI local
  document.querySelectorAll(`.swiper-slide .card[data-id="${card.id}"] .badge.captured`).forEach(b => b.classList.remove('hidden'));
}
