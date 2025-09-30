document.addEventListener("DOMContentLoaded", function() {
  // Références DOM
  const authOverlay = document.getElementById('auth-overlay');
  const btnSignup = document.getElementById('btn-signup');
  const btnSignin = document.getElementById('btn-signin');
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('password');

  // Initialisation Firebase Auth et Firestore
  const auth = firebase.auth();
  const db = firebase.firestore();
  let currentUser = null;

  // Inscription
  if(btnSignup) {
    btnSignup.addEventListener('click', async () => {
      const email = emailInput.value.trim();
      const password = passInput.value;
      if(!email || !password) { alert("Email et mot de passe requis"); return; }
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert("Inscription réussie !");
      } catch(err) {
        alert("Erreur inscription : " + err.message);
      }
    });
  }

  // Connexion
  if(btnSignin) {
    btnSignin.addEventListener('click', async () => {
      const email = emailInput.value.trim();
      const password = passInput.value;
      if(!email || !password) { alert("Email et mot de passe requis"); return; }
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch(err) {
        alert("Erreur connexion : " + err.message);
      }
    });
  }

  // Observer état auth
  auth.onAuthStateChanged(user => {
    currentUser = user;
    if(user) {
      authOverlay.style.display = 'none';
      // Tu peux ici initialiser l'app (charger cartes, swiper...)
      console.log("Utilisateur connecté :", user.email);
    } else {
      authOverlay.style.display = 'flex';
    }
  });
});
