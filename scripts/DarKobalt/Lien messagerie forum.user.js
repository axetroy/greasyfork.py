// ==UserScript==
// @name         Lien messagerie forum
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Ajoute un lien dans la liste des actions pour aller directement sur la messagerie via le forum.
// @author       MockingJay
// @include      https://www.dreadcast.net/Forum*
// @grant        none
// ==/UserScript==

$(document).ready(function() {
    'use strict';
    $("#list_actions > ul").append('<li><a href="http://www.dreadcast.net/Forum/2-21-Messagerie">Messagerie via forum</a></li>');
});