// --- Authentification participants ---

document.addEventListener("DOMContentLoaded", () => {
  console.log("App.js chargé ✅");

  // Récupère les éléments du DOM
  const btnSignup = document.getElementById("btn-signup");
  const btnSignin = document.getElementById("btn-signin");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const authOverlay = document.getElementById("auth-overlay");

  // Vérifie si Firebase est bien chargé
  if (typeof firebase === "undefined") {
    console.error("❌ Firebase n'est pas défini. Vérifie firebase-config.js");
    return;
  }

  const auth = firebase.auth();

  // --- Inscription ---
  if (btnSignup) {
    btnSignup.addEventListener("click", () => {
      const email = emailInput.value;
      const password = passwordInput.value;

      auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          console.log("✅ Inscription réussie :", userCredential.user.email);
          if (authOverlay) authOverlay.style.display = "none"; // Cache l'overlay
        })
        .catch(error => {
          console.error("❌ Erreur inscription :", error.message);
          alert(error.message);
        });
    });
  }

  // --- Connexion ---
  if (btnSignin) {
    btnSignin.addEventListener("click", () => {
      const email = emailInput.value;
      const password = passwordInput.value;

      auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          console.log("✅ Connexion réussie :", userCredential.user.email);
          if (authOverlay) authOverlay.style.display = "none"; // Cache l'overlay
        })
        .catch(error => {
          console.error("❌ Erreur connexion :", error.message);
          alert(error.message);
        });
    });
  }

  // --- Vérifie si déjà connecté ---
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log("🔑 Utilisateur déjà connecté :", user.email);
      if (authOverlay) authOverlay.style.display = "none";
    } else {
      console.log("ℹ️ Aucun utilisateur connecté");
      if (authOverlay) authOverlay.style.display = "flex";
    }
  });
});
