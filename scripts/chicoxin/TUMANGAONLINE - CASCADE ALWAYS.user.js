// ==UserScript==
// @name         TUMANGAONLINE - CASCADE ALWAYS
// @namespace    
// @version      1
// @description  set cascade vide mode on tumangaonline on load page
// @author       chicoxin
// @match        https://www.tumangaonline.com/lector/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    angular.element($('body')).scope().lector.cambiarModo('cascada');
})();