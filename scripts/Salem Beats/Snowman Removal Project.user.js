// ==UserScript==
// @name         Snowman Removal Project
// @namespace    salembeats
// @version      1.1
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      https://turkerhub.com/threads/*
// @grant        none
// ==/UserScript==

let up = false;

let snowMan = document.querySelector("div[style*='transform']");
snowMan.style.transform = "scale(-1)";
snowMan.style.bottom = "";
snowMan.style.top = "-120px";
document.body.insertAdjacentHTML("afterend", `<svg style="transform: rotate(-180deg) translateY(0px); position: fixed; top: -50px; right: 140px; z-index: ${Number.MAX_SAFE_INTEGER-1}"><polygon points="40,0 240,0 240,110 40,110" fill="#FFFFFF" /> <polygon points="0,0 40,0 40,40 0,0" fill="#FFFFFF" /></svg><div id='whatDoesTheSpiderSay' style='position: fixed; color: black; right: 195px; width: 150px; top:10px; pointer-events: none; z-index: ${Number.MAX_SAFE_INTEGER}'>Lol check me out guys, I'm a snowman.</div>`);

setInterval(function upDown() {
    up = !up;
    if(up) {
        snowMan.style.transition = "1s all linear";
        snowMan.style.transform = "rotate(-180deg) translateY(-50px)";
    }
    else {
        snowMan.style.transition = "1s all linear";
        snowMan.style.transform = "rotate(-180deg) translateY(50px)";
    }

}, 500);

document.querySelectorAll("div").forEach((el) => {el.style.transition = "20s all linear "; el.style.background = `rgb(${Math.random()*255, Math.random()*255, Math.random()*255})`; el.style.transform = `scale(${Math.random()*2}) rotate(${Math.random() * 360}deg)`;});