// ==UserScript==
// @name         FIX RETARDED AFIP
// @namespace    TUVIEJA
// @version      0.1
// @description  cambio type number a type text PORQUE AFIP SUCKEA
// @author       You
// @match        https://auth.afip.gob.ar/contribuyente_/login.xhtml
// @grant        none
// ==/UserScript==

(function() {
    document.getElementById("F1:username").type = "text";
})();