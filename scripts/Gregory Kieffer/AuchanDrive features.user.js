// ==UserScript==
// @name         AuchanDrive features
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds more stuff to auchandrive.lu
// @author       Gregory Kieffer
// @match        https://www.auchandrive.lu/*
// @grant        none
// ==/UserScript==

(function() {
    window.onkeydown = function(ev){
        if(ev.key==="/"){
            console.info('search');
            var input = document.getElementById('searchZone');
            if(input)
            {
                input.focus();
                ev.preventDefault();
                return false;
            }
        }
    };

})();