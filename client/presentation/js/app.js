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











document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("myAudio");
    let muteButton = document.getElementById("muteButton");
    let Playing = false;
    
    // Vérification du cookie pour restaurer l'état de lecture du son
    const soundPlayingCookie = document.cookie.split('; ').find(row => row.startsWith('soundPlaying='));
    if (soundPlayingCookie) {
        Playing = true;
        muteButton.classList.remove("fa-solid");
        muteButton.classList.remove("fa-volume-xmark");
        muteButton.classList.add("fa-solid");
        muteButton.classList.add("fa-volume-high");
    }
    
    muteButton.addEventListener("click", () => {
        if (!Playing) {
            audio.play();
            Playing = true;
            // Enregistrement du cookie lors du démarrage du son
            document.cookie = "soundPlaying=true";
            muteButton.classList.remove("fa-solid");
            muteButton.classList.remove("fa-volume-xmark");
            muteButton.classList.add("fa-solid");
            muteButton.classList.add("fa-volume-high");
        } else {
            audio.pause();
            Playing = false;
            // Suppression du cookie lors de la pause du son
            document.cookie = "soundPlaying=; expires=Fri, 31 Dec 2050 23:59:59 GMT; path=/;";
            muteButton.classList.remove("fa-solid");
            muteButton.classList.remove("fa-volume-high");
            muteButton.classList.add("fa-solid");
            muteButton.classList.add("fa-volume-xmark");
        }
    });
});