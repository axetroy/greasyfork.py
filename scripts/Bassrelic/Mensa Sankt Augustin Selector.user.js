// ==UserScript==
// @name         Mensa Sankt Augustin Selector
// @namespace    http://www.maxmanager.de
// @match        http://www.maxmanager.de/daten-extern/sw-bonn/html/speiseplaene.php
// @version      1.0
// @description  This script selects the "Mensa Sankt Augustin" Tab on "http://www.maxmanager.de/daten-extern/sw-bonn/html/speiseplaene.php"
// @author       Bassrelic
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onload = function(){
        var location = window.location.toString();
        if (location.includes("http://www.maxmanager.de/daten-extern/sw-bonn/html/speiseplaene.php") === true){
            var targetDiv = document.getElementsByClassName('fltl');
            targetDiv[7].click();
        }
    };
})();