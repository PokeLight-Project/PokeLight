// Fonction pour aller à la page création
function goToCreate() {
    window.location.href = "../creation/creation.html";
}

// Ajouter un écouteur d'événement au clic sur l'élément avec la classe "restart"
const restart = document.querySelector(".restart");
restart.addEventListener("click", goToCreate);





// Fonction pour aller à la page Accueil
function goToStart() {
    window.location.href = "../Accueil/index.html";
}

// Ajouter un écouteur d'événement au clic sur l'élément avec la classe "exit"
const exit = document.querySelector(".exit");
exit.addEventListener("click", goToStart);





/* Audio */
document.addEventListener("DOMContentLoaded", function () {
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
});





/* Envoie du message en BDD */
document.addEventListener("DOMContentLoaded", function () {
    const commentTextarea = document.getElementById("commentTextarea");
    const sendButton = document.getElementById("bottom-button");

    sendButton.addEventListener("click", function () {
        const comment = commentTextarea.value;
        console.log(comment)

        if (comment.trim() !== "") {
            const data = { content_message: comment };

            fetch("http://localhost:8000/createMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                console.log("Comment saved successfully:", result);
                commentTextarea.value = ""; // Réinitialise la valeur du textarea
            })
            .catch(error => {
                console.error("Error saving comment:", error);
            });
        }
    });
});