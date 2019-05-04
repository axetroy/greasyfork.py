// ==UserScript==
// @name         Fix Bug Notice W&A
// @namespace    https://worldaide.fr/
// @version      1.
// @description  Good
// @author       Marentdu93
// @match        https://worldaide.fr/
// @match        https://worldaide.fr/chatbox/
// @grant        none
// ==/UserScript==
function myFunction() {
    $('.importantMessage').remove();
}
setInterval(myFunction, 250);