// ==UserScript==
// @name         GloboFree
// @namespace    http://oglobo.globo.com
// @version      0.1
// @description  Desbloqueia paywall do site do Estadão
// @author       Bolsonaro2018
// @match        https://oglobo.globo.com/*
// @grant        none
// ==/UserScript==

/*
 * Se a imprensa mente, pelo menos não pague para ser enganado.
 */

(function() {
    'use strict';
    setInterval(function () {
        try {
            document.getElementById('comunicacaoFechada').style.display = 'none';
            document.getElementById('footerOgloboPianoId').style.display = 'none';
            document.body.style.overflow = 'scroll'
        } catch (e) { }
    }, 250);
})();
