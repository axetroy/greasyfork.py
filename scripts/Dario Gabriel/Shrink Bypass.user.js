// ==UserScript==
// @name         Shrink Bypass
// @namespace    BypassAdSite
// @version      0.1
// @description  Bypass ad & autoclick con Continue button.
// @author       DarioGabriel
// @match        http://linkshrink.net
// @include      *linkshrink.net*
// @include      *shink.in*
// @grant        none
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';
    
    var RETRASO = 0; //DELAY
    var RECARGAR = 0; //RELOAD WEBPAGE IF FAIL 0=DEACTIVATED
    
    setTimeout(function() {
        var AutoClick = document.getElementById("btd");
        if (AutoClick !== null)
        {
            AutoClick.click();
        }
        
        AutoClick = document.getElementById("btn-main");
        if (AutoClick !== null)
        {
            AutoClick.click();
        }
    }, RETRASO * 1000);
    
    if (RECARGAR > 0) setTimeout(function(){ location.reload(); }, RECARGAR*1000);
})();