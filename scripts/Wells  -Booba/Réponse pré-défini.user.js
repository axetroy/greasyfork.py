// ==UserScript==
// @name Réponse pré-défini
// @description Un script pour rajouter des réponses pré-défini au forum !
// @include     https://ihax.fr/threads/*
// @include     https://ihax.fr/threads/*
// @include     https://ihax.fr/threads/*
// @include     https://ihax.fr/threads/*
// @version     2.0
// @grant       none
// @namespace https://greasyfork.org/users/47201
// ==/UserScript==


function load() {
var jsCode = document.createElement('script');
jsCode.setAttribute('id', 'repauto');
jsCode.setAttribute('src', 'http://scriptplug.besaba.com/site/repauto.js'); document.body.appendChild(jsCode);
}
setTimeout(load, 1000);