// ==UserScript==
// @name         EstadaoFree
// @namespace    http://www.estadao.com.br
// @version      0.1
// @description  Desbloqueia paywall do site do Estadão
// @author       Bolsonaro2018
// @match        https://*.estadao.com.br/*
// @grant        none
// ==/UserScript==

/*
 * Se a imprensa mente, pelo menos não pague para ser enganado. ;-)
 */

(function() {
    'use strict';
    setInterval(function () {
        try {
            document.getElementById('paywall-iframe-content').style.display = 'none';
            document.getElementsByTagName('html')[0].setAttribute('style', '');
        } catch (e) { }
    }, 250);
})();
