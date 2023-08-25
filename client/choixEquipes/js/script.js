// Respecter les bonnes méthodes JS
"use strict"

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
        }
        else {
            myAudio.pause();
            play = false;

            playAudio.classList.remove("fa-solid");
            playAudio.classList.remove("fa-volume-high");
            playAudio.classList.add("fa-solid");
            playAudio.classList.add("fa-volume-xmark");
        }
    })

    // Petite méthode d'Alexis = créer une fonction pour faire un fectch
    async function httpGet(url) {
        const query = await fetch(url);
        // Convert into JSON
        const response = await query.json();
        return response;
    }

    function getAllPokedex() {
        let showPokedex = document.getElementById("container_middle");
        console.log(showPokedex);

        const response = httpGet("http://localhost:8000/allPokedex");

        console.log(response);
        response.then((data) => {
            console.log(data);

            data.forEach(element => {
                let color = "";
                if (element.type_pokemon == "plante") {
                    color = "background:rgba(0, 255, 26, 0.5);"
                } else if (element.type_pokemon == "feu") {
                    color = "background:rgba(255, 0, 0, 0.5);"
                } else if (element.type_pokemon == "eau") {
                    color = "background:rgba(0, 133, 255, 0.5);"
                } else if (element.type_pokemon == "combat") {
                    color = "background:rgba(255, 138, 0, 0.5);"
                }

                const card = document.createElement("div");
                card.className = "card";
                card.style = color;
                card.draggable = true;

                card.innerHTML = `
                    <p>${element.username_user}</p>
                    <img src="${element.image_url_pokemon}" alt="Photo du Pokémon de ${element.username_user}">
                    <p>LVL ${element.level}</p>
                `;

                card.addEventListener("dragstart", (event) => {
                    event.dataTransfer.setData("text/plain", JSON.stringify(element));
                });

                showPokedex.appendChild(card);
            });
        });
    }
    getAllPokedex();

    const dragdropRed = document.querySelector(".dragdrop_red");
    const dragdropFlora = document.querySelector(".dragdrop_flora");

    dragdropRed.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    dragdropFlora.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    dragdropRed.addEventListener("drop", (event) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));
        createCardInDropZone(data, dragdropRed);
    });

    dragdropFlora.addEventListener("drop", (event) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));
        createCardInDropZone(data, dragdropFlora);
    });






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
        return ""; // Valeur par défaut
    }





    function createCardInDropZone(data, dropZone) {
        // let color = "";
        // if (data.type_pokemon == "plante") {
        //     color = "background:rgba(0, 255, 26, 0.5);";
        // } else if (data.type_pokemon == "feu") {
        //     color = "background:rgba(255, 0, 0, 0.5);";
        // } else if (data.type_pokemon == "eau") {
        //     color = "background:rgba(0, 133, 255, 0.5);";
        // } else if (data.type_pokemon == "combat") {
        //     color = "background:rgba(255, 138, 0, 0.5);";
        // }

        const teamCards = dropZone.querySelectorAll(".card");

        if (teamCards.length < 5) {
            let cardColor = determineColor(data.type_pokemon);


            const card = document.createElement("div");
            card.className = "card";
            card.style = cardColor;

            card.innerHTML = `
            <p>${data.username_user}</p>
            <img src="${data.image_url_pokemon}" alt="Photo du Pokémon de ${data.username_user}">
            <p>LVL ${data.level}</p>
        `;

            dropZone.appendChild(card);
        }
    }
});