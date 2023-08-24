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

                showPokedex.innerHTML += `<div class="card" style="${color}">
                <p>${element.username_user}</p>
                <img src= "${element.image_url_pokemon}" alt="Photo du Pokémon de ${element.username_user}">
                <p>LVL ${element.level}</p>
                </div>`
            });
        })
    }
    getAllPokedex();



})