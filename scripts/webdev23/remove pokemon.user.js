// ==UserScript==
// @name        remove pokemon
// @namespace   remove pokemon
// @include     https://*, http://*
// @version     1.1
// @description:en Remove pokemons from the whole internet
// @grant       none
// @description Remove pokemon from the whole internet
// ==/UserScript==

if (document.body.innerHTML.contains("pokemon") != "0") {alert("Fuck off from here")}
var el = document.body;
function warn() {
if (document.body.innerHTML.contains("pokemon") != "0") {alert("Fuck off from here")}}
el.addEventListener("DOMSubtreeModified", warn, false)