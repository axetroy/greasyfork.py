// ==UserScript==
// @name         Invert color
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Black theme
// @include      http://*/*
// @include      https://*/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    function menuItemClicked(){
        document.body.style.filter = 'invert(1)';
        document.body.style.backgroundColor = 'rgba(255,255,255,1)';
        var i;
        for (i = 0; i < document.images.length; i++) {
            document.images[i].style.filter = 'invert(1)';
        }
    }

    GM_registerMenuCommand("Make it dark", menuItemClicked);
})();