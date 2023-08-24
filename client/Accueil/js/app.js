// Fonction pour aller à la page présentation
function goToPresentation() {
    window.location.href = "../presentation/index.html"; // Remplacez par le chemin correct
}

// Ajouter un écouteur d'événement au clic sur l'élément avec la classe "fa-people-group"
const peopleGroupElement = document.querySelector(".fa-people-group");
peopleGroupElement.addEventListener("click", goToPresentation);

// Fonction pour aller à la page règles
function goToRules() {
    window.location.href = "../regles/index.html"; // Remplacez par le chemin correct
}

// Ajouter un écouteur d'événement au clic sur l'élément avec la classe "fa-question"
const rules = document.querySelector(".fa-question");
rules.addEventListener("click", goToRules);