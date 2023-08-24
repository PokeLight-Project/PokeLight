"use strict"

document.addEventListener("DOMContentLoaded", function () {
    const myAudio = document.getElementById("myAudio");
    const playAudio = document.getElementById("volume");
    let Playing = false;

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

    async function httpGet(url) {
        const query = await fetch(url)

        const response = await query.json();
        return response;
    }

    function getAllPokemonLvl1() {
        let pokemonLvl1 = document.getElementById("pokemonLvl1");
        const response = httpGet("http://localhost:8000/allPokemonLvl")

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
                } else {
                    color = "background:rgba(255, 138, 0, 0.5);"
                }
                pokemonLvl1.innerHTML += `
                                         <div class="card" style="${color}" id="pokemon-${element.id_pokemon}">
                                            <i id="${element.id_pokemon}" class="fa-sharp fa-solid fa-question interrogation"></i>
                                            <img src="${element.image_url_pokemon}" alt="Photo de ${element.name_pokemon}">
                                        </div>`;

            });
                // Récupération les points d'interrogation pour afficher les stats
            let openStat = document.querySelectorAll(".interrogation")
                
            console.log(openStat);

            openStat.forEach(element => {
                element.addEventListener("click", () => {
                    const pokemonId = element.id;
                    console.log(pokemonId);
                    const response = httpGet(`http://localhost:8000/onePokemon/${pokemonId}`);
                    console.log(response);
            
                    // Mettre à jour la carte du Pokémon avec les nouvelles informations
                    response.then((data) => {
                        console.log(data);
                        const pokemonCard = document.getElementById(`pokemon-${pokemonId}`);
                      
                            // Remplacez le contenu de la carte avec les nouvelles informations
                            pokemonCard.innerHTML = `
                            <i id="${element.id}" class="fa-sharp fa-solid fa-question interrogation"></i>
                                <div class="card2">
                                
                                <img src="" alt="Photo du type ${data[0].type_pokemon}"> 
                                <p> PV : ${data[0].pv_pokemon} </p>
                                <p> PV : ${data[0].pa_pokemon} </p>
                                </div>

                               
                            `;
                        
                    });
                });
            });


        })

    }

    getAllPokemonLvl1();


})