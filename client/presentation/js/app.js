// Fonction pour ouvrir la modale d'Alexis
function openModalAlexis() {
    document.getElementById("myModalAlexis").style.display = "block";
    document.body.style.overflow = "hidden"; // Empêcher le défilement du contenu derrière
}

// Fonction pour fermer la modale d'Alexis
function closeModalAlexis() {
    document.getElementById("myModalAlexis").style.display = "none";
    document.body.style.overflow = "auto"; // Rétablir le défilement du contenu
}

// Fonction pour ouvrir la modale de Charles
function openModalCharles() {
    document.getElementById("myModalCharles").style.display = "block";
    document.body.style.overflow = "hidden"; // Empêcher le défilement du contenu derrière
}

// Fonction pour fermer la modale de Charles
function closeModalCharles() {
    document.getElementById("myModalCharles").style.display = "none";
    document.body.style.overflow = "auto"; // Rétablir le défilement du contenu
}

// Fonction pour ouvrir la modale de Charles
function openModalSeb() {
    document.getElementById("myModalSeb").style.display = "block";
    document.body.style.overflow = "hidden"; // Empêcher le défilement du contenu derrière
}

// Fonction pour fermer la modale de Charles
function closeModalSeb() {
    document.getElementById("myModalSeb").style.display = "none";
    document.body.style.overflow = "auto"; // Rétablir le défilement du contenu
}

// Gestion du clic sur la fenêtre
window.onclick = function(event) {
    if (event.target.classList.contains("modal-alexis")) {
        closeModalAlexis();
    } else if (event.target.classList.contains("modal-charles")) {
        closeModalCharles();
    } else if (event.target.classList.contains("modal-seb")) {
        closeModalSeb();
    }
}

// Fonction pour revenir à la page d'accueil
function returnToHomePage() {
    window.location.href = "../Accueil/index.html"; // Remplacez par le chemin correct
}

// Ajouter un écouteur d'événement au clic sur l'élément avec la classe "header-icons"
const headerIconsElement = document.querySelector(".header-icons");
headerIconsElement.addEventListener("click", returnToHomePage);