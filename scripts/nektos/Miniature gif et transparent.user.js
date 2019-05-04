// ==UserScript==
// @name         Miniature gif et transparent
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Affiche les gif et png transparent en miniature
// @author       Nektos
// @include       http://www.jeuxvideo.com/*
// @grant        none
// ==/UserScript==

    imagashack = document.getElementsByClassName('img-shack');
    for (var i = 0; i < imagashack.length; i++) {
        img = document.getElementsByClassName('img-shack')[i];
        srcc = img.src;
        alt = img.alt;
        if (img.alt.endsWith("gif")) {
            console.log("il y a un gif ici !");
            srcc = srcc.replace("minis", "fichiers").replace("png", "gif");
            document.getElementsByClassName('img-shack')[i].src = srcc;
        }
        else if (img.alt.endsWith("png")) {
            srcc = srcc.replace("minis", "fichiers");
            document.getElementsByClassName('img-shack')[i].src = srcc;
        }
}

