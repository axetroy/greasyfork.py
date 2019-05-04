// ==UserScript==
// @name         Le Marché Jap - Hide unavailable products
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hide unavailable products
// @author       Shuunen
// @match        https://www.lemarchejaponais.fr/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var els = document.querySelectorAll('.nostock');

    els.forEach(function(el){
        el = el.parentElement.parentElement;
        el.style.display = 'none';
        el = el.nextElementSibling;
        el.style.display = 'none';
        el = el.previousElementSibling.previousElementSibling;
        el.style.display = 'none';
        el = el.previousElementSibling;
        el.style.display = 'none';
        el = el.previousElementSibling;
        el.style.display = 'none';
    });
})();