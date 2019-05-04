// ==UserScript==
// @name         Compucalitv Remove Links Counter
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Elimina el contador para ver enlaces en CompucaliTV!
// @author       DarioGabriel
// @match        *compucalitv.com*
// @include      *compucalitv.com*
// @include      *compul.in*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var CompulClick = document.getElementsByClassName("btn btn-lg btn-success")[0];
    if (CompulClick !== undefined) CompulClick.click();
    
    var LockerDiv = document.getElementsByClassName("onp-sl-content")[0];
    if (LockerDiv !== undefined)
    {
        LockerDiv.setAttribute("data-lock-id", "");
        LockerDiv.style.display = "inline";
    }

    window.location=targetURL;
})();