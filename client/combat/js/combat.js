"use strict"

document.addEventListener("DOMContentLoaded", async function () {

    // Fonction asynchrone pour effectuer une requête HTTP GET
    async function httpGet(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }


    const myAudio = document.getElementById("myAudio")

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
    });


    async function GetbackGround() {
        const response = await httpGet("http://localhost:8000/getMap")
        console.log(response);

        // Filtrer les arènes pour exclure "secret"
        const filteredArenas = response.filter(arena => arena.name_arena !== "secret");
        // console.log(filteredArenas);

        // Générer un index aléatoire pour choisir une arène
        const randomIndex = Math.floor(Math.random() * filteredArenas.length);
        // console.log(randomIndex);

        // Sélectionner l'arène aléatoire
        const selectedArena = filteredArenas[randomIndex];
        console.log(selectedArena);

        const arenaBackground = document.querySelector(".size");


        if (selectedArena) {
            arenaBackground.style.backgroundImage = `url('${selectedArena.image_url_arena}')`;
            myAudio.setAttribute("src", selectedArena.audio)


        }
    }

    GetbackGround();


    
})