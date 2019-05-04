// ==UserScript==
// @name         Stop Shpak
// @version      1.0
// @namespace    dasefern.com
// @description  Скрипт заменяет многоточия в комментариях на одинарные точки
// @author       Kesantielu Dasefern
// @match        *://*.yvision.kz/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    var a = document.querySelectorAll('.comment_item .comment .body');
    a.forEach( function(b) {
        b.innerHTML = b.innerHTML.replace(/(\.)+/g,'.');
    } );
})();