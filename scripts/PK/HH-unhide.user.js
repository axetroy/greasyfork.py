// ==UserScript==
// @name         HH-unhide
// @namespace    pk-HH
// @version      1.2
// @description  Show image of not recruited girls instead of "black contour"
// @author       PK
// @match        https://www.hentaiheroes.com/harem*
// @grant        none

// ==/UserScript==
function myScript(){
    var els = document.querySelectorAll("img.avatar");
    var len = els.length;

    console.log(els[150]);


    while( len-- ) {
        els[len].src = els[len].src.replace('avb0.png','ava0.png');
    }

    console.log(els[150]);
}

(function() {
    'use strict';
    myScript();

})();

addEventListener("click", myScript);