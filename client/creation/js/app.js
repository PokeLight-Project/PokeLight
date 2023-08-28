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
    });

    // Fonction asynchrone pour effectuer une requête HTTP GET
    async function httpGet(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    // Fonction pour remplir la liste des Pokémon
    async function listPokemonLvl1() {
        let pokemonLvl1 = document.getElementById("pokemonLvl1");

        // Attendre la réponse de la requête HTTP pour obtenir la liste des Pokémon
        const response = await httpGet("http://localhost:8000/allPokemonLvl");

        console.log(response);

        // Parcourir la liste des Pokémon et ajouter chaque carte à la page
        response.forEach(element => {
            let color = "";
            if (element.type_pokemon == "plante") {
                color = "background:rgba(0, 255, 26, 0.5);"
            } else if (element.type_pokemon == "feu") {
                color = "background:rgba(255, 0, 0, 0.5);"
            } else if (element.type_pokemon == "eau") {
                color = "background:rgba(0, 133, 255, 0.5);"
            } else {
                color = "background:rgba(255, 138, 0, 0.5);"
            }

            // Création de la carte du Pokémon avec un identifiant unique basé sur son ID
            pokemonLvl1.innerHTML += `
                <div class="card" style="${color}" data-pokemon-id="${element.id_pokemon}">
                    <i class="fa-sharp fa-solid fa-question interrogation"></i>
                    <img src="${element.image_url_pokemon}" alt="Photo de ${element.name_pokemon}">
                </div>`;

            // Appeler la fonction pour activer la sélection de la carte
            activateCardSelection();
        });
    }

    // Fonction pour ouvrir les détails d'un Pokémon
    async function openPokemonDetails(pokemonId) {
        // Attendre la réponse de la requête HTTP pour obtenir les détails du Pokémon
        const response = await httpGet(`http://localhost:8000/onePokemon/${pokemonId}`);
        console.log(response);

        // Mettre à jour la carte du Pokémon avec les nouvelles informations
        const pokemonCard = document.querySelector(`[data-pokemon-id="${pokemonId}"]`);
        let img = "";
        if (response[0].type_pokemon == "plante") {
            img = "../Imgs/pokémons/typePlante.png"
        } else if (response[0].type_pokemon == "feu") {
            img = "../Imgs/pokémons/typeFeu.png"
        } else if (response[0].type_pokemon == "eau") {
            img = "../Imgs/pokémons/typeEau.png"
        } else {
            img = "../Imgs/pokémons/poing.png"
        }

        // Stocker les données d'origine de la carte du Pokémon
        pokemonCard.dataset.originalContent = pokemonCard.innerHTML;

        // Remplacer le contenu de la carte avec les nouvelles informations
        pokemonCard.innerHTML = `
            <i class="fa-solid fa-xmark cross"></i>
            <div class="card2">
                <img id="typePokemon" src="${img}" alt="Photo du type ${response[0].type_pokemon}">
                <p> PV : <span>${response[0].pv_pokemon}</span> </p>
                <p> PA : ${response[0].pa_pokemon} </p>
            </div>
        `;
    }

    // Gestionnaire d'événements délégué pour les boutons de fermeture
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("cross")) {
            const pokemonId = event.target.closest(".card").getAttribute("data-pokemon-id");
            console.log("Fermeture pour le Pokémon avec l'ID : " + pokemonId);
            // Restaurer la carte du Pokémon avec les données d'origine
            const pokemonCard = document.querySelector(`[data-pokemon-id="${pokemonId}"]`);
            pokemonCard.innerHTML = pokemonCard.dataset.originalContent;
        }
    });

    // Gestionnaire d'événements pour l'ouverture des détails du Pokémon
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("interrogation")) {
            const pokemonId = event.target.closest(".card").getAttribute("data-pokemon-id");
            console.log("Ouverture pour le Pokémon avec l'ID : " + pokemonId);
            // Ouvrir les détails du Pokémon
            openPokemonDetails(pokemonId);
        }
    });

    // Charger la liste des Pokémon lors du chargement de la page
    listPokemonLvl1();

    async function listPokedex() {
        const listPokedex = document.getElementById("pokedex")
        const response = await httpGet("http://localhost:8000/allPokedex")
        console.log(response);
        response.forEach(data => {
            console.log(data);
            listPokedex.innerHTML += `
                                    <div class="listPokedex">
                                            <p> ${data.username_user}</p>
                                            <img src="${data.image_url_pokemon}" alt="Photo du pokemon d'${data.username_user}">
                                            <i id="${data.id_user}" class="fa-solid fa-trash-can delete"></i>
                                            <div class="hp"></div>
                                            <p> LVL : ${data.level}</p>
                                     </div>
                                    `
            const deletes = document.querySelectorAll(".delete");

            console.log(deletes);

            deletes.forEach(element => {
                element.addEventListener("click", () => {
                    console.log("coucou");
                    console.log(element);

                    const userId = element.id;
                    console.log(userId);

                    try {
                        const response = fetch(`http://localhost:8000/delete/${userId}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    } catch (err) {
                        console.error("Erreur lors de l'envoi de la requête", error);
                    }

                })

            });

        });

    }



    listPokedex();

    function activateCardSelection() {
        const cards = document.querySelectorAll(".card");
        // console.log(cards);

        cards.forEach(card => {
            card.addEventListener("click", () => {
                // Désélectionner toutes les cartes en supprimant la bordure
                cards.forEach(otherCard => {
                    otherCard.classList.remove("selected-card");
                });

                // Ajouter la classe "selected-card" à la carte sélectionnée
                card.classList.add("selected-card");

                // Récupérer l'ID du Pokémon sélectionné
                const pokemonId = card.getAttribute("data-pokemon-id");
                console.log("Carte sélectionnée avec l'ID : " + pokemonId);

            });
        });
    }


    const formulaire = document.getElementById("formulaire")

    formulaire.addEventListener("submit", addUser);

    async function addUser(event) {
        event.preventDefault();

        // Récupérer les données de l'utilisateur
        const nom = document.getElementById("nom").value;

        const pokemonId = document.querySelector(".selected-card").getAttribute("data-pokemon-id");
        console.log(pokemonId);
        console.log(nom);
        const userData = {
            username_user: nom,
            id_pokemon: pokemonId
        }
        try {
            const response = await fetch("http://localhost:8000/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            setTimeout(() => {
                window.location.reload();
            }, 500);

        } catch (error) {
            console.error("Erreur lors de l'envoi de la requête", error)
        }

        console.log(userData);
    }



});
