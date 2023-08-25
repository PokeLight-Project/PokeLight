// Fonction pour revenir à la page d'accueil
function returnToHomePage() {
    window.location.href = "../Accueil/index.html"; // Remplacez par le chemin correct
}

// Ajouter un écouteur d'événement au clic sur l'élément avec l'ID "buttonA"
const buttonAElement = document.querySelector("#buttonA");
buttonAElement.addEventListener("click", returnToHomePage);