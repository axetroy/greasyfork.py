// ==UserScript==
// @name         Fix Bug Notice MC
// @namespace    https://www.modzcatz.fr/index.php
// @version      1.1
// @description  Good Fuck 
// @author       Sharke
// @match        https://www.modzcatz.fr/index.php
// @match        https://www.modzcatz.fr/index.php
// @grant        none
// ==/UserScript==
function myFunction() {
    $('.importantMessage').remove();
}
setInterval(myFunction, 250);