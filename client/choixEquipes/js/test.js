const characterHolder = document.querySelector(".character-holder");
const team1Holder = document.querySelector(".team1-holder");
const team2Holder = document.querySelector(".team2-holder");

let currentlyDragging = null;

document.addEventListener("dragstart", (event) => {
    if (
        event.target.className === "character-holder" ||
        event.target.className === "team1-holder" ||
        event.target.className === "team2-holder"
    ) {
        return;
    }

    currentlyDragging = event.target;
});

document.addEventListener("dragover", (event) => {
    event.preventDefault();
});

document.addEventListener("drop", (event) => {
    event.preventDefault();
    if (currentlyDragging) {
        const target = event.target;

        if (
            target.className === "character-holder" ||
            target.className === "team1-holder" ||
            target.className === "team2-holder"
        ) {
            target.appendChild(currentlyDragging);
        }

        currentlyDragging = null;
    }
});