"use strict"

document.addEventListener("DOMContentLoaded", function () {


    const myAudio = document.getElementById("myAudio")
    const playAudio = document.getElementById("volume")


    playAudio.addEventListener("click", () => {
        if(myAudio.paused) {
            myAudio.play();
            playAudio.classList.remove("fa-solid fa-volume-high")
            playAudio.classList.add("fa-solid fa-volume-xmark")
        } else {
            myAudio.pause();
            
        }

    })




})