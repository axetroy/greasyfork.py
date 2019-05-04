// ==UserScript==
// @name         Fake Kissanime redirect
// @namespace    http://codymkw.github.io/
// @version      1.2
// @description  Redirect all fake Kissanime sites to the real Kissanime!
// @author       CodyMKW
// @match        *://kissanime.io/*
// @match        *://kissanime.pro/*
// @match        *://*.kiss-anime.me/*
// @match        *://anime8.me/*
// @match        *://animecool.se/*
// @grant        none
// ==/UserScript==

(function() {
    window.location = "http://kissanime.ru/";
})();