"use strict";

document.addEventListener("DOMContentLoaded", async function () {

    // Fonction asynchrone pour effectuer une requête HTTP GET
    async function httpGet(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const myAudio = document.getElementById("myAudio");
    const playAudio = document.getElementById("volume");
    let playing = false;

    // Gestionnaire de clic pour le bouton de lecture audio
    playAudio.addEventListener("click", () => {
        if (!playing) {
            myAudio.play();
            playing = true;
            // Mise à jour des classes pour changer l'icône du bouton
            playAudio.classList.remove("fa-solid");
            playAudio.classList.remove("fa-volume-xmark");
            playAudio.classList.add("fa-solid");
            playAudio.classList.add("fa-volume-high");
        } else {
            myAudio.pause();
            playing = false;
            // Mise à jour des classes pour changer l'icône du bouton
            playAudio.classList.remove("fa-solid");
            playAudio.classList.remove("fa-volume-high");
            playAudio.classList.add("fa-solid");
            playAudio.classList.add("fa-volume-xmark");
        }
    });

    async function GetbackGround() {
        // Effectuer une requête HTTP GET pour obtenir les données de l'arène
        const response = await httpGet("http://localhost:8000/getMap");
        console.log(response);

        // Filtrer les arènes pour exclure "secret"
        const filteredArenas = response.filter(arena => arena.name_arena !== "secret");
        // Sélectionner une arène aléatoire parmi les arènes filtrées
        const randomIndex = Math.floor(Math.random() * filteredArenas.length);
        const selectedArena = filteredArenas[randomIndex];
        console.log(selectedArena);

        // Mettre à jour l'arrière-plan de l'arène avec l'image de l'arène sélectionnée
        const arenaBackground = document.querySelector(".size");
        if (selectedArena) {
            arenaBackground.style.backgroundImage = `url('${selectedArena.image_url_arena}')`;
            myAudio.setAttribute("src", selectedArena.audio);
        }
    }

    GetbackGround();

    // Sélectionner les éléments HTML pour l'équipe Red et les Pokéballs Red
    const teamRed = document.getElementById("teamRed");
    const pokeballRed = document.getElementById("pokeballRed");

    async function getTeamRed() {
        // Effectuer une requête HTTP GET pour obtenir les données de l'équipe Red
        const response = await httpGet("http://localhost:8000/getTeamRed");
        console.log(response);

        let id = 1;
        response.forEach(data => {
            console.log(data);

            // Utiliser l'attribut de données personnalisé data-hp pour stocker les PV
            teamRed.innerHTML += `
                <div id="pokemonRed${id}" class="pokemonTeamRed">
                    <p>${data.username_user}</p>
                    <img src="${data.image_url_pokemon}" alt="Photo du pokemon ${data.name_pokemon}"/>
                    <div id="${id}" class="hp" style="width:${data.pv_pokemon}px"> <span style="display:none" class="pv_pokemon" data-hp="${data.pv_pokemon}">${data.pv_pokemon}</span></div>
                    <div class="hpRed"></div>
                    <div class="pa_pokemon" style="display:none">${data.pa_pokemon}</div>
                </div>
            `;

            // Mettez à jour la largeur de la barre de vie en fonction des points de vie du Pokémon
            const hpBar = document.getElementById(id);
            hpBar.style.width = data.pv_pokemon + 'px';

            id++;

            // Afficher la Pokéball pour chaque Pokémon de l'équipe Red
            pokeballRed.innerHTML += `<div class="pokeball">
                <img class="imgPokeball" src="${data.image_url_pokemon}" alt="photo du pokemon ${data.name_pokemon}"/>
            </div>`;
        });
    }

    getTeamRed();

    // Sélectionner les éléments HTML pour l'équipe Flora et les Pokéballs Flora
    const teamFlora = document.getElementById("teamFlora");
    const pokeballFlora = document.getElementById("pokeballFlora");

    async function getTeamFlora() {
        // Effectuer une requête HTTP GET pour obtenir les données de l'équipe Flora
        const response = await httpGet("http://localhost:8000/getTeamFlora");
        console.log(response);
        let id = 1;
        response.forEach(data => {
            console.log(data);

            // Utiliser l'attribut de données personnalisé data-hp pour stocker les PV
            teamFlora.innerHTML += `
                <div id="pokemonFlora${id}" class="pokemonTeamFlora">
                    <p>${data.username_user}</p>
                    <img src="${data.image_url_pokemon}" alt="Photo du pokemon ${data.name_pokemon}"/>
                    <div id="hpFlora${id}" class="hp" style="width:${data.pv_pokemon}px"> <span style="display:none" class="pv_pokemon" data-hp="${data.pv_pokemon}">${data.pv_pokemon}</span></div>
                    <div class="hpRed"></div>
                    <div class="pa_pokemon" style="display:none">${data.pa_pokemon}</div>
                </div>
            `;

            // Mettez à jour la largeur de la barre de vie en fonction des points de vie du Pokémon
            const hpBar = document.getElementById(`hpFlora${id}`);
            hpBar.style.width = data.pv_pokemon + 'px';

            id++;
            // Afficher la Pokéball pour chaque Pokémon de l'équipe Flora
            pokeballFlora.innerHTML += `<div class="pokeball">
                <img class="imgPokeball" src="${data.image_url_pokemon}" alt="photo du pokemon ${data.name_pokemon}"/>
            </div>`;
        });
    }

    getTeamFlora();

    let isBattleInProgress = false;

         // Fonction pour simuler une attaque
    function simulateAttack(attacker, defender) {
        if (isBattleInProgress) {
            return; // Évitez les attaques simultanées
        }

        isBattleInProgress = true;

        // Ajouter la classe attaqueActif au Pokémon attaquant
        attacker.classList.add("attaqueActif");
        // Ajouter la classe defendActif au Pokémon défendant
        defender.classList.add("defendActif");

        // Extraire les valeurs d'attaque et de points de vie
        const attackerAttackElement = attacker.querySelector(".pa_pokemon");
        const defenderHPElement = defender.querySelector(".pv_pokemon");
        const defenderHPBar = defender.querySelector(".hp"); // Récupérer la barre de vie

        if (attackerAttackElement && defenderHPElement && defenderHPBar) {
            const attackerAttackText = attackerAttackElement.innerText;
            const defenderHPText = defenderHPElement.getAttribute("data-hp");

            // Utiliser une expression régulière pour valider les valeurs en tant que nombres entiers
            if (integerPattern.test(attackerAttackText) && integerPattern.test(defenderHPText)) {
                const attackerAttack = parseInt(attackerAttackText);
                const defenderHP = parseInt(defenderHPText);

                setTimeout(() => {
                     // Calculer les dégâts en soustrayant l'attaque du défenseur des points de vie du défenseur
                const damage = Math.max(0, attackerAttack); // Les dégâts ne peuvent pas être négatifs

                // Assurez-vous que les dégâts ne sont pas supérieurs aux points de vie du défenseur
                const newHP = Math.max(0, defenderHP - damage);

                // Mettre à jour les points de vie de la cible
                defenderHPElement.setAttribute("data-hp", newHP);
                defenderHPElement.innerText = newHP + ' PV'; // Mettez à jour le texte des PV

                // Mettre à jour la largeur de la barre de vie en pourcentage
                const maxWidth = 100; // Largeur maximale de la barre de vie en pourcentage
                const newWidth = (newHP / defenderHP) * maxWidth;
                defenderHPBar.style.width = newWidth + '%';

                if (newHP <= 0) {
                    // La cible est KO, la retirer de l'équipe défendante
                    defender.style.display = 'none'; // Cacher le Pokémon KO

                    // Vérifier si toute l'équipe est KO
                    const activeDefenders = Array.from(document.querySelectorAll(".pokemonTeamFlora:not([style='display: none;'])"));
                    if (activeDefenders.length === 0) {
                        console.log("Fin du combat. Toute l'équipe adverse est KO.");
                        isBattleInProgress = false;
                        return;
                    }
                }
                }, 500);
               
            } else {
                // Gérer le cas où les valeurs ne sont pas des nombres valides
                console.error("Les valeurs de pa_pokemon ou pv_pokemon ne sont pas des nombres valides.");
            }
        } else {
            // Gérer le cas où les éléments pa_pokemon ou pv_pokemon n'ont pas été trouvés.
            console.error("Les éléments pa_pokemon ou pv_pokemon n'ont pas été trouvés.");
        }

        // Laisser un bref délai avant la prochaine attaque
        setTimeout(() => {
            isBattleInProgress = false;
            // Supprimer la classe attaqueActif du Pokémon attaquant
            attacker.classList.remove("attaqueActif");
            // Supprimer la classe defendActif du Pokémon défendant
            defender.classList.remove("defendActif");
            doRound();
        }, 1500);
    }


    let round = 1;
    let teamRedIndex = 0;
    let teamFloraIndex = 0;

    function doRound() {
        // Déterminer quelle équipe attaque en fonction du tour
        let attacker, defender;

        if (round % 2 === 0) {
            // L'équipe Flora attaque
            attacker = document.querySelectorAll(".pokemonTeamFlora")[teamFloraIndex];
            defender = document.querySelectorAll(".pokemonTeamRed")[teamRedIndex];

            teamFloraIndex++;
            if (teamFloraIndex >= document.querySelectorAll(".pokemonTeamFlora").length) {
                teamFloraIndex = 0;
            }
        } else {
            // L'équipe Red attaque
            attacker = document.querySelectorAll(".pokemonTeamRed")[teamRedIndex];
            defender = document.querySelectorAll(".pokemonTeamFlora")[teamFloraIndex];

            teamRedIndex++;
            if (teamRedIndex >= document.querySelectorAll(".pokemonTeamRed").length) {
                teamRedIndex = 0;
            }
        }

        // Afficher quel Pokémon attaque quel autre Pokémon dans la console
        console.log(`Tour ${round}: ${attacker.querySelector("p").innerText} attaque ${defender.querySelector("p").innerText}`);

        // Simuler l'attaque et les dégâts
        simulateAttack(attacker, defender);

        // Passer au prochain round
        round++;
    }

    const startButton = document.getElementById("start");

    // Démarrer la première manche
    startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        console.log("Démarrer la première manche");

        // Démarrer la première manche
        doRound();
    });

    // Définissez integerPattern en dehors de la fonction simulateAttack
    const integerPattern = /^\d+$/;

});