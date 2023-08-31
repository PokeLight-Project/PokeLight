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





// Fonction pour aller à la page "création"
function goToCreate() {
    window.location.href = "../creation/creation.html";
}

// Ajouter un écouteur d'événement au clic sur l'élément avec la classe "fa-question"
const create = document.querySelector(".press-start-text");
create.addEventListener("click", goToCreate);





/* Audio */
    let audio = document.getElementById("myAudio");
    let muteButton = document.getElementById("muteButton");
    let Playing = false;
    muteButton.addEventListener("click", () => {
        if (!Playing) {
            audio.play();
            Playing = true;
            muteButton.classList.remove("fa-solid");
            muteButton.classList.remove("fa-volume-xmark");
            muteButton.classList.add("fa-solid");
            muteButton.classList.add("fa-volume-high");
        } else {
            audio.pause();
            Playing = false;
            muteButton.classList.remove("fa-solid");
            muteButton.classList.remove("fa-volume-high");
            muteButton.classList.add("fa-solid");
            muteButton.classList.add("fa-volume-xmark");
        }
    })





    /* Close Popup */
    document.addEventListener("DOMContentLoaded", function () {
        // Pop-up "activez le son"
        const pop_up = document.getElementById("popupContainer")
        const close_pop_up = document.getElementById("popupClose")
    
        setTimeout(() => {
            pop_up.style.opacity = "1";
        }, 1000);
    
        close_pop_up.addEventListener("click", () => {
            pop_up.style.opacity = "0";
        });
});