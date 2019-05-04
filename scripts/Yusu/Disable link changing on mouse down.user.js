// ==UserScript==
// @name         Disable link changing on mouse down
// @namespace    disable-link-change
// @version      0.2
// @include      *
// @description  Disables that annoying link changing to add their tracking that websites like Google and Reddit do even when you right click. 
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    document.addEventListener('mousedown', ({target: a}) => {
        if (a.href){
            var clicked_link = a.href;

            setTimeout(f => {
                a.href = clicked_link;
            })
        }
    }, true);
})();