// ==UserScript==
// @name         Médiapart 1 page
// @namespace    https://greasyfork.org/fr/users/170628
// @version      1.1
// @description  Articles sur 1 page, inspiré de https://greasyfork.org/fr/scripts/34995-mediapart-ensure-that-full-page-reading-is-enabled mais corrige le souci sur les commentaires
// @author       Xelab
// @match        *://*.mediapart.fr/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var UrlPathToUse  = window.location.pathname;
    var oldUrlPath  = window.location.href;

    /*--- Test that "onglet=full" is at end of URL*/

    if ( ! /onglet=full$/.test(oldUrlPath) && ! /commentaires/.test(oldUrlPath) && ! /search/.test(oldUrlPath)) {


        var newURL  = window.location.protocol + "//" + window.location.host + UrlPathToUse + "?onglet=full" + window.location.hash;
        /*-- replace() puts the good page in the history instead of the
        bad page.*/
        window.location.replace(newURL);
    }
})();