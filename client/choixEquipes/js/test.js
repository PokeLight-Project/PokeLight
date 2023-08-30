// const characterHolder = document.querySelector(".character-holder");
// const team1Holder = document.querySelector(".team1-holder");
// const team2Holder = document.querySelector(".team2-holder");

// let currentlyDragging = null;

// document.addEventListener("dragstart", (event) => {
//     if (
//         event.target.className === "character-holder" ||
//         event.target.className === "team1-holder" ||
//         event.target.className === "team2-holder"
//     ) {
//         return;
//     }

//     currentlyDragging = event.target;
// });

// document.addEventListener("dragover", (event) => {
//     event.preventDefault();
// });

// document.addEventListener("drop", (event) => {
//     event.preventDefault();
//     if (currentlyDragging) {
//         const target = event.target;

//         if (
//             target.className === "character-holder" ||
//             target.className === "team1-holder" ||
//             target.className === "team2-holder"
//         ) {
//             target.appendChild(currentlyDragging);
//         }

//         currentlyDragging = null;
//     }
// });



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