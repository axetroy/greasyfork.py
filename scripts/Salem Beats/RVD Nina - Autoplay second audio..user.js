// ==UserScript==
// @name         RVD Nina - Autoplay second audio.
// @namespace    salembeats
// @version      2
// @description  Autoplays the second audio when the first is done.
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @grant        none
// ==/UserScript==

let gidsAllowed = [
    "3W718UE9DT45KHFDCXLXTUHZUJR8KX",
    "3Q0WB0IIY8DLCJ13I0DQY6V7NO5ZN2"
];

for(let [index, gidAllowed] of gidsAllowed.entries()) {
    if(document.referrer.includes(gidAllowed)) {
        break;
    }
    else if(index === gidAllowed.length - 1) {
        return;
    }
}

new MutationObserver(mutations => {
    for(let mutation of mutations) {
        if(mutation.target.style.left.includes("97")) {
            document.querySelector("#playerButton-player2").click();
        }
    }
}).observe(document.querySelector("#dot-player1"), {attributes: true});