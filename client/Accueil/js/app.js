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





// /* Audio */
// document.addEventListener("DOMContentLoaded", function () {
//     let audio = document.getElementById("myAudio");
//     let muteButton = document.getElementById("muteButton");

//     audio.muted = true; // Mute by default

//     muteButton.addEventListener("click", function () {
//         if (audio.muted) {
//             audio.muted = false;
//             muteButton.classList.remove("fa-volume-xmark");
//             muteButton.classList.add("fa-volume-high");
//         } else {
//             audio.muted = true;
//             muteButton.classList.remove("fa-volume-high");
//             muteButton.classList.add("fa-volume-xmark");
//         }
//     });
// });

"use strict"

document.addEventListener("DOMContentLoaded", async function () {
    // Récupération des éléments audio et du bouton de lecture
    const myAudio = document.getElementById("myAudio");
    const playAudio = document.getElementById("volume");
    let Playing = false;

    // Gestionnaire de clic pour le bouton de lecture audio
    playAudio.addEventListener("click", () => {
        if (!Playing) {
            myAudio.play();
            Playing = true;
            playAudio.classList.remove("fa-solid");
            playAudio.classList.remove("fa-volume-xmark");
            playAudio.classList.add("fa-solid");
            playAudio.classList.add("fa-volume-high");
        } else {
            myAudio.pause();
            Playing = false;
            playAudio.classList.remove("fa-solid");
            playAudio.classList.remove("fa-volume-high");
            playAudio.classList.add("fa-solid");
            playAudio.classList.add("fa-volume-xmark");
        }
    })
})