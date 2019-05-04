// ==UserScript==
// @name         Neodice Remove Particles
// @namespace    http://neodice.ga/
// @version      0.1
// @description  Removes particles from the Neodice.ga background
// @author       smeagol
// @match        http://neodice.ga/
// @grant        none
// @copyright   2015+, smeagol
// @require     http://code.jquery.com/jquery-latest.min.js
// @license     MIT
// ==/UserScript==

$(document).ready(function() {
    $('.particles-js-canvas-el').css('display', 'none');
});
