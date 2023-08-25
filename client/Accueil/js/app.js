// Fonction pour aller à la page présentation
function goToPresentation() {
    window.location.href = "../presentation/index.html";
}

// Ajouter un écouteur d'événement au clic sur l'élément avec la classe "fa-people-group"
const peopleGroupElement = document.querySelector(".fa-people-group");
peopleGroupElement.addEventListener("click", goToPresentation);





// Fonction pour aller à la page règles
function goToRules() {
    window.location.href = "../regles/index.html";
}

// Ajouter un écouteur d'événement au clic sur l'élément avec la classe "fa-question"
const rules = document.querySelector(".fa-question");
rules.addEventListener("click", goToRules);





/* Audio */
document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("myAudio");
    let muteButton = document.getElementById("muteButton");

    audio.muted = true; // Mute by default

    muteButton.addEventListener("click", function () {
        if (audio.muted) {
            audio.muted = false;
            muteButton.classList.remove("fa-volume-xmark");
            muteButton.classList.add("fa-volume-high");
        } else {
            audio.muted = true;
            muteButton.classList.remove("fa-volume-high");
            muteButton.classList.add("fa-volume-xmark");
        }
    });
});