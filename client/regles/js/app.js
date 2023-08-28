// Fonction pour revenir à la page d'accueil
function returnToHomePage() {
    window.location.href = "../Accueil/index.html"; // Remplacez par le chemin correct
}

// Ajouter un écouteur d'événement au clic sur l'élément avec la classe "header-icons"
const headerIconsElement = document.querySelector(".header-icons");
headerIconsElement.addEventListener("click", returnToHomePage);