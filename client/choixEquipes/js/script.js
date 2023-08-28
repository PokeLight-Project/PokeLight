// ACTUELLEMENT ON PEUT DUPLIQUER LES POKÉMONS D'UNE ÉQUIPE A L'AUTRE
// JE VEUX POUVOIR DÉPLACER LES POKÉMONS D'UNE COLONNE A L'AUTRE, Y COMPRIS DANS LA COLONNE DU MILIEU


"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const myAudio = document.getElementById("music");
    const playAudio = document.getElementById("sound_barre");

    let play = false;

    playAudio.addEventListener("click", () => {
        if (!play) {
            myAudio.play();
            play = true;

            playAudio.classList.remove("fa-solid");
            playAudio.classList.remove("fa-volume-xmark");
            playAudio.classList.add("fa-solid");
            playAudio.classList.add("fa-volume-high");
        } else {
            myAudio.pause();
            play = false;

            playAudio.classList.remove("fa-solid");
            playAudio.classList.remove("fa-volume-high");
            playAudio.classList.add("fa-solid");
            playAudio.classList.add("fa-volume-xmark");
        }
    });

    async function httpGet(url) {
        const query = await fetch(url);
        const response = await query.json();
        return response;
    }

    function determineColor(type) {
        if (type === "plante") {
            return "background: rgba(0, 255, 26, 0.5);";
        } else if (type === "feu") {
            return "background: rgba(255, 0, 0, 0.5);";
        } else if (type === "eau") {
            return "background: rgba(0, 133, 255, 0.5);";
        } else if (type === "combat") {
            return "background: rgba(255, 138, 0, 0.5);";
        }
        return "";
    }

    function getAllPokedex() {
        let showPokedex = document.getElementById("container_middle");

        const response = httpGet("http://localhost:8000/allPokedex");

        response.then((data) => {
            data.forEach((element) => {
                let color = determineColor(element.type_pokemon);

                const card = document.createElement("div");
                card.className = "card";
                card.style = color;
                card.draggable = true;
                card.isInTeam = false;
                card.dataset.id = element.id_user;
                card.setAttribute("data-pokemon", JSON.stringify(element)); // Pour le glisser-déposer

                card.innerHTML = `
                    <p>${element.username_user}</p>
                    <img src="${element.image_url_pokemon}" alt="Photo du Pokémon de ${element.username_user}">
                    <p>LVL ${element.level}</p>
                `;

                card.addEventListener("dragstart", (event) => {
                    event.dataTransfer.setData("text/plain", JSON.stringify(element));
                    element.isInTeam = false;
                });

                showPokedex.appendChild(card);
            });
        });
    }

    const middleColumn = document.getElementById("container_middle");
    const dragdropRed = document.querySelector(".dragdrop_red");
    const dragdropFlora = document.querySelector(".dragdrop_flora");
    const addedPokemons = {};

    function canDrop(data, dropZone) {
        return (
            !data.isInTeam &&
            dropZone.querySelectorAll(`.card[data-id="${data.id_user}"]`).length === 0 &&
            Object.keys(addedPokemons).length < 5
        );
    }

    function addToTeam(data, dropZone) {
        data.isInTeam = true;
        createCardInDropZone(data, dropZone);
        addedPokemons[data.id_user] = true; // Marquer le Pokémon comme ajouté
        const middleColumnCard = middleColumn.querySelector(`.card[data-id="${data.id_user}"]`);
        if (middleColumnCard) {
            middleColumnCard.remove();
        }
    }

    function removeFromTeam(id_user) {
        delete addedPokemons[id_user];
    }

    dragdropRed.addEventListener("dragover", (event) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));
        event.dataTransfer.dropEffect = canDrop(data, dragdropRed) ? "move" : "none";
    });

    dragdropFlora.addEventListener("dragover", (event) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));
        event.dataTransfer.dropEffect = canDrop(data, dragdropFlora) ? "move" : "none";
    });

    dragdropRed.addEventListener("drop", (event) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));

        if (canDrop(data, dragdropRed)) {
            addToTeam(data, dragdropRed);
            removeFromTeam(data.id_user);
        }
    });

    dragdropFlora.addEventListener("drop", (event) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));

        if (canDrop(data, dragdropFlora)) {
            addToTeam(data, dragdropFlora);
            removeFromTeam(data.id_user);
        }
    });

    function createCardInDropZone(data, dropZone) {
        const teamCards = dropZone.querySelectorAll(".card");

        if (teamCards.length < 5) {
            let cardColor = determineColor(data.type_pokemon);

            const card = document.createElement("div");
            card.className = "card";
            card.style = cardColor;
            card.dataset.id = data.id_user;
            card.draggable = true;
            card.isInTeam = true;

            card.innerHTML = `
                <p>${data.username_user}</p>
                <img src="${data.image_url_pokemon}" alt="Photo du Pokémon de ${data.username_user}">
                <p>LVL ${data.level}</p>
            `;

            card.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text/plain", JSON.stringify(data));
                data.isInTeam = false;
            });

            dropZone.appendChild(card);
        }
    }

    getAllPokedex();







    const combatBtn = document.getElementById("combat_btn");

    function updateCombatButton() {
        const hasRedPokemons = dragdropRed.querySelectorAll(".card").length > 0;
        const hasFloraPokemons = dragdropFlora.querySelectorAll(".card").length > 0;

        if (hasRedPokemons || hasFloraPokemons) {
            combatBtn.style.backgroundColor = "#E70E0E";
            combatBtn.disabled = false;
        } else {
            combatBtn.style.backgroundColor = "";
            combatBtn.disabled = true;
        }
    }

    combatBtn.addEventListener("click", () => {
        // Ajoutez ici le code pour rediriger vers la page "combat"
        window.location.href = "../combat/combat.html";
    });

    // Ajoutez cet appel pour mettre à jour le bouton au chargement de la page
    updateCombatButton();
});
