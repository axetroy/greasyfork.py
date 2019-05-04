// ==UserScript==
// @name        stop adblock whining
// @namespace   root.cz
// @description remove yellow box for AdBlock users
// @include     http://www.root.cz/*
// @include     https://www.root.cz/*
// @version     1
// @grant       none
// ==/UserScript==

whine = document.getElementsByClassName('adBlockMessage');
for (x=0;x<whine.length;x++) {
    whine[x].style.display='none';
}

