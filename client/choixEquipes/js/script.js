// "use strict";

// document.addEventListener("DOMContentLoaded", () => {
//     const myAudio = document.getElementById("music");
//     const playAudio = document.getElementById("sound_barre");

//     let play = false;

//     playAudio.addEventListener("click", () => {
//         if (!play) {
//             myAudio.play();
//             play = true;

//             playAudio.classList.remove("fa-solid");
//             playAudio.classList.remove("fa-volume-xmark");
//             playAudio.classList.add("fa-solid");
//             playAudio.classList.add("fa-volume-high");
//         } else {
//             myAudio.pause();
//             play = false;

//             playAudio.classList.remove("fa-solid");
//             playAudio.classList.remove("fa-volume-high");
//             playAudio.classList.add("fa-solid");
//             playAudio.classList.add("fa-volume-xmark");
//         }
//     });

//     async function httpGet(url) {
//         const query = await fetch(url);
//         const response = await query.json();
//         return response;
//     }

//     function determineColor(type) {
//         if (type === "plante") {
//             return "background: rgba(0, 255, 26, 0.5);";
//         } else if (type === "feu") {
//             return "background: rgba(255, 0, 0, 0.5);";
//         } else if (type === "eau") {
//             return "background: rgba(0, 133, 255, 0.5);";
//         } else if (type === "combat") {
//             return "background: rgba(255, 138, 0, 0.5);";
//         }
//         return "";
//     }

//     function getAllPokedex() {
//         let showPokedex = document.getElementById("container_middle");

//         const response = httpGet("http://localhost:8000/allPokedex");

//         response.then((data) => {
//             data.forEach((element) => {
//                 let color = determineColor(element.type_pokemon);

//                 const card = document.createElement("div");
//                 card.className = "card";
//                 card.style = color;
//                 card.draggable = true;
//                 card.isInTeam = false;
//                 card.dataset.id = element.id_user;
//                 card.setAttribute("data-pokemon", JSON.stringify(element)); // Pour le glisser-déposer

//                 card.innerHTML = `
//                     <p>${element.username_user}</p>
//                     <img src="${element.image_url_pokemon}" alt="Photo du Pokémon de ${element.username_user}">
//                     <p>LVL ${element.level}</p>
//                 `;

//                 card.addEventListener("dragstart", (e) => {
//                     e.dataTransfer.setData("text/plain", JSON.stringify(element));
//                 });

//                 showPokedex.appendChild(card);
//             });
//         });
//     }
//     getAllPokedex();

//     const containers = document.querySelectorAll(".dragdrop_red, .container_middle, .dragdrop_flora");
//     const combatButton = document.getElementById("combat_btn");

//     containers.forEach((container) => {
//         container.addEventListener("dragover", (e) => {
//             e.preventDefault();
//         });

//         container.addEventListener("drop", (e) => {
//             e.preventDefault();
//             const data = JSON.parse(e.dataTransfer.getData("text/plain"));

//             const existingCard = document.querySelector(`[data-pokemon='${JSON.stringify(data)}']`);

//             if (container.classList.contains("dragdrop_red") || container.classList.contains("dragdrop_flora")) {

//                 if (container.childElementCount < 5) {
//                     if (existingCard) {
//                         container.appendChild(existingCard);
//                     } else {
//                         const newCard = document.createElement("div");
//                         newCard.className = "card";
//                         newCard.style = determineColor(data.type_pokemon);
//                         newCard.draggable = true;
//                         newCard.isInTeam = false;
//                         newCard.dataset.id = data.id_user;
//                         newCard.setAttribute("data-pokemon", JSON.stringify(data));

//                         newCard.innerHTML = `
//                             <p>${data.username_user}</p>
//                             <img src="${data.image_url_pokemon}" alt="Photo du Pokémon de ${data.username_user}">
//                             <p>LVL ${data.level}</p>
//                         `;

//                         container.appendChild(newCard);
//                     }

//                     // Vérifier si les équipes contiennent au moins un pokémon
//                     const redTeam = document.querySelectorAll(".dragdrop_red .card");
//                     const floraTeam = document.querySelectorAll(".dragdrop_flora .card");

//                     if (redTeam.length > 0 && floraTeam.length > 0) {
//                         combatButton.disabled = false;
//                         combatButton.style.backgroundColor = "#e70e0e";
//                     } else {
//                         combatButton.disabled = true;
//                         combatButton.style.backgroundColor = "";
//                     }
//                 } else {
//                     alert("Max 5 pokémons par équipe !");
//                 }
//             } else {
//                 if (existingCard) {
//                     container.appendChild(existingCard);
//                 }
//             }
//         });
//     });
// });

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

                card.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("text/plain", JSON.stringify(element));
                });

                showPokedex.appendChild(card);
            });

            sortCardsAlphabetically(showPokedex); // Tri initial
        });
    }
    getAllPokedex();

    function sortCardsAlphabetically(container) {
        const cards = Array.from(container.querySelectorAll(".card"));
        cards.sort((a, b) => {
            const nameA = JSON.parse(a.getAttribute("data-pokemon")).username_user.toLowerCase();
            const nameB = JSON.parse(b.getAttribute("data-pokemon")).username_user.toLowerCase();
            return nameA.localeCompare(nameB);
        });
        container.innerHTML = "";
        cards.forEach(card => container.appendChild(card));
    }

    const containers = document.querySelectorAll(".dragdrop_red, .container_middle, .dragdrop_flora");
    const combatButton = document.getElementById("combat_btn");

    containers.forEach((container) => {
        container.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        container.addEventListener("drop", (e) => {
            e.preventDefault();
            const data = JSON.parse(e.dataTransfer.getData("text/plain"));

            const existingCard = document.querySelector(`[data-pokemon='${JSON.stringify(data)}']`);

            if (container.classList.contains("dragdrop_red") || container.classList.contains("dragdrop_flora")) {

                if (container.childElementCount < 5) {
                    if (existingCard) {
                        container.appendChild(existingCard);
                        sortCardsAlphabetically(container); // Tri après ajout
                    } else {
                        const newCard = document.createElement("div");
                        newCard.className = "card";
                        newCard.style = determineColor(data.type_pokemon);
                        newCard.draggable = true;
                        newCard.isInTeam = false;
                        newCard.dataset.id = data.id_user;
                        newCard.setAttribute("data-pokemon", JSON.stringify(data));

                        newCard.innerHTML = `
                            <p>${data.username_user}</p>
                            <img src="${data.image_url_pokemon}" alt="Photo du Pokémon de ${data.username_user}">
                            <p>LVL ${data.level}</p>
                        `;

                        container.appendChild(newCard);
                        sortCardsAlphabetically(container); // Tri après ajout
                    }

                    // Vérifier si les équipes contiennent au moins un pokémon
                    const redTeam = document.querySelectorAll(".dragdrop_red .card");
                    const floraTeam = document.querySelectorAll(".dragdrop_flora .card");

                    if (redTeam.length > 0 && floraTeam.length > 0) {
                        combatButton.disabled = false;
                        combatButton.style.backgroundColor = "#e70e0e";
                    } else {
                        combatButton.disabled = true;
                        combatButton.style.backgroundColor = "";
                    }
                } else {
                    alert("Max 5 pokémons par équipe !");
                }
            } else {
                if (existingCard) {
                    container.appendChild(existingCard);
                    sortCardsAlphabetically(container); // Tri après retrait
                }
            }
        });
    });
});