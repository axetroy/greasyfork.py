// ==UserScript==
// @name         VejaFree
// @namespace    http://www.veja.com.br
// @version      0.1
// @description  Desbloqueia paywall do site da Veja
// @author       Bolsonaro2018
// @match        https://veja.abril.com.br/*
// @grant        none
// ==/UserScript==

/*
 * Se a imprensa mente, pelo menos não pague para ser enganado. ;-)
 */

(function() {
    'use strict';
    setInterval(function () {
        try {
            document.body.setAttribute('style', 'margin-top: 0px; padding: 0px');
            Object.values(document.getElementsByClassName('piano-offer-overlay'))
                .concat([document.getElementById('piano_offer')])
                .concat([document.getElementById('superbanner-3')])
                .forEach(function (elm) { elm.style.display = 'none'; });
        } catch (e) { }
    }, 250);
})();
