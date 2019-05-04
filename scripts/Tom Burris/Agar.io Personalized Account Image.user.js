// ==UserScript==
// @name         Agar.io Personalized Account Image
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Change Your FB Or Google Image On Agar.io
// @author       Tom Burris
// @match        http://agar.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    var yourImage = "PUT YOUR IMAGE URL HERE!";

    var img = document.getElementsByClassName("agario-profile-picture")[0];
    img.src = yourImage;
    img.width = "64";
    img.height = "64";
    img.style.cssFloat = "left";
    img.style.borderRadius = "5px";
    img.style.border = "2px solid #CCC";
    img.style.marginRight = "6px";
    img.className = "different";
})();