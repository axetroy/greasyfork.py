// ==UserScript==
// @name         Remove vOZ's right blank area.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove voz right blank area.
// @author       Psyblade
// @grant        none
// @include        https://forums.voz.vn/*
// ==/UserScript==

var element = document.getElementsByClassName("main");
element[0].classList.remove("main");