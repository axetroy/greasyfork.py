// ==UserScript==
// @name         Fix Bug Notice RG
// @namespace    http://rootflash.fr/
// @version      1.
// @description  Good
// @author       Marentdu93
// @match        http://rootflash.fr/
// @match        http://rootflash.fr/taigachat/
// @grant        none
// ==/UserScript==
function myFunction() {
    $('.importantMessage').remove();
}
setInterval(myFunction, 250);