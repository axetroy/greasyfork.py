// ==UserScript==
// @name         Anti Anti Adblock LEQUIPE.fr
// @require http://code.jquery.com/jquery-latest.js
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Syntaxlb
// @match        http://www.lequipe.fr/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $(function() {
        
        function removeAds()
        {
            
            $('#ab-tutorial').parent().parent().remove();
            setTimeout(removeAds(), 1000);
        }
        removeAds();
    });
        

})();