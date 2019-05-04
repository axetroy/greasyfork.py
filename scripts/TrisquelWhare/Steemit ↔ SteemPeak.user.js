// ==UserScript==
// @name        Steemit ↔ SteemPeak
// @namespace   Steemit ↔ SteemPeak
// @description Quickly Switch Between Steemit.com and SteemPeak.com
// @version     1
// @author      https://steempeak.com/@trisquelwhare (based on a script by https://steemit.com/@bitcoiner)
// @include     https://steemit.com/*
// @include     https://steempeak.com/*
// @grant       none
// ==/UserScript==
 
var menu = document.body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="userscript-context-menu" type="context"><menuitem id="userscript-context-menuitem" label="Steemit ↔ SteemPeak" icon="https://steempeak.com/assets/favicons/favicon-32x32.png"></menuitem></menu>';
 
var html = document.documentElement;
html.setAttribute("contextmenu", "userscript-context-menu");
 
document.getElementById("userscript-context-menuitem").addEventListener("click", onMenuClick, false);
 
function onMenuClick() {
    location.assign("//" + ((location.hostname == "steempeak.com") ? "steemit.com" : "steempeak.com") + ((location.pathname.split("/")[1].indexOf("@") == -1) ? location.pathname : ("/" + location.pathname.split("/")[1])));