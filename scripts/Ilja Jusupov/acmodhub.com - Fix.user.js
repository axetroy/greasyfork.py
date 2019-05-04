// ==UserScript==
// @name         acmodhub.com - Fix
// @namespace    x4fab_acmodhub
// @version      0.1
// @description  What a bunch of stupid idiots have created this site? 
// @author       x4fab
// @match        http://acmodhub.com/*
// @grant        none
// ==/UserScript==

window.onload = function (){
    document.onkeydown = document.onselectstart = document.onmousedown = document.onclick = document.oncontextmenu = null;
    document.body.style.WebkitUserSelect = 'initial';
}