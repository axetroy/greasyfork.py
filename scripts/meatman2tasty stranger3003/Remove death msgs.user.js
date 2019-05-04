// ==UserScript==
// @name         Remove death msgs
// @namespace    meatman2tasty
// @version      1.2
// @description  Removes Death Messages, etc. to reduce lag
// @author       Meatman2tasty
// @match        http://karnage.io/*
// @grant        none
// ==/UserScript==

var element = document.getElementById("scoreMessage");
element.parentNode.removeChild(element);

var element = document.getElementById("scoreMessageAmnt");
element.parentNode.removeChild(element);