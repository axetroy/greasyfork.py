// ==UserScript==
// @name         3dmgame.eu Videos Remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  3dmgame annoying videos remover
// @author       You
// @match        *3dmgame.eu*
// @include      *3dmgame.eu*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var x;
    var i;
    var ElementIDs = document.getElementsByTagName("div");
    for (i = 0; i < ElementIDs.length; i++) {
        if (ElementIDs[i].id.indexOf("HTML") != -1)
        {
            ElementIDs[i].remove();
            
        }
    }

    ElementIDs = document.getElementsByTagName("iframe");
    for (i = 0; i < ElementIDs.length; i++) {
        if (ElementIDs[i].src.indexOf("dailymotion") != -1)
        {
            ElementIDs[i].remove();
            
        }
    }
   
})();