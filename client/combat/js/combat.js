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


    const teamRed = document.getElementById("teamRed")
    const pokeballRed = document.getElementById("pokeballRed")


    async function getTeamRed() {
        const response = await httpGet("http://localhost:8000/getTeamRed")
        console.log(response);

        let id = 1;
        response.forEach(data => {
            console.log(data);
            teamRed.innerHTML += `
                                    <div id="pokemonRed${id}" class="pokemonTeamRed">
                                        <p>${data.username_user}</p>
                                        <img src="${data.image_url_pokemon}" alt="Photo du pokemon ${data.name_pokemon}"/>
                                        <div class="hp"></div>
                                        <div class="hpRed"></div>
                                    </div>
                                    `
            id++;

            pokeballRed.innerHTML += `<div class="pokeball">
                                                                <img class="imgPokeball" src="${data.image_url_pokemon}" alt="photo du pokemon ${data.name_pokemon}"/>
                                                                
                                                                </div>
                                                                `

        });

    }

    getTeamRed();


    const teamFlora = document.getElementById("teamFlora")
    const pokeballFlora = document.getElementById("pokeballFlora")
    async function getTeamFlora() {

        const response = await httpGet("http://localhost:8000/getTeamFlora")
        console.log(response);
        let id = 1;
        response.forEach(data => {
            console.log(data);
            teamFlora.innerHTML += `
                                    <div id="pokemonFlora${id}" class="pokemonTeamFlora">
                                        <p>${data.username_user}</p>
                                        <img src="${data.image_url_pokemon}" alt="Photo du pokemon ${data.name_pokemon}"/>
                                        <div class="hp"></div>
                                        <div class="hpRed"></div>
                                    </div>
                                    `
            id++;
            pokeballFlora.innerHTML += `<div class="pokeball">
                                                                <img class="imgPokeball" src="${data.image_url_pokemon}" alt="photo du pokemon ${data.name_pokemon}"/>
                                                                
                                                                </div>
                                                                `


        });

    }

    getTeamFlora();

    let start = document.getElementById("start")

    start.addEventListener("click", () => {
        start.style.display = "none"
        let pokemonRed = Array.from(document.querySelectorAll(".pokemonTeamRed"));
        let pokemonFlora = Array.from(document.querySelectorAll(".pokemonTeamFlora"));
        console.log(pokemonRed);
        console.log(pokemonFlora);

        // var min = 1;
        // var max = 3;
        // var random = Math.floor(Math.random() * (max - min)) + min;
        // console.log(random);

        // console.log(pokemonRed.length);

        // let teamStart;
        // let teamEnd;

        // // if (random == 1) {
        // //     teamStart = pokemonRed;
        // //     teamEnd = pokemonFlora
        // // } else {
        // //     teamStart = pokemonFlora;
        // //     teamEnd = pokemonRed;
        // // }

        let round = 1;
        while (pokemonRed.length > 0 && pokemonFlora.length > 0) {

             // Déterminer quelle équipe attaque en premier
    let attackerTeam, defenderTeam;
    if (round % 2 === 0) {
        attackerTeam = pokemonRed;
        defenderTeam = pokemonFlora;
    } else {
        attackerTeam = pokemonFlora;
        defenderTeam = pokemonRed;
    }

    // Sélectionner un attaquant aléatoire de l'équipe attaquante
    const attackerIndex = Math.floor(Math.random() * attackerTeam.length);
    const attacker = attackerTeam[attackerIndex];
    console.log(attackerIndex);
    console.log(attacker);

    // Sélectionner une cible aléatoire de l'équipe défendante
    const defenderIndex = Math.floor(Math.random() * defenderTeam.length);
    const defender = defenderTeam[defenderIndex];
    console.log(defenderIndex);
    console.log(defender);

    // Simuler l'attaque et les dégâts (vous devrez implémenter cette logique)
    // const damage = simulateAttack(attacker, defender);

    // Mettre à jour les points de vie de la cible
    defender.hp -= damage;
    console.log(defender.hp);

    // Vérifier si la cible est KO
    if (defender.hp <= 0) {
        // La cible est KO, la retirer de l'équipe défendante
        defenderTeam.splice(defenderIndex, 1);
    }

    // Passer au prochain round
    round++;

            // pokemonRed.splice(0, 1);
            // pokemonFlora.splice(0, 1);
            // console.log(pokemonFlora.length);
            // console.log("Combat en cours...");
        }

        console.log("Fin du combat.");
    })

})