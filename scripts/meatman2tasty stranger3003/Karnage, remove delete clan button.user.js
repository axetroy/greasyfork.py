// ==UserScript==
// @name         Karnage, remove delete clan button
// @namespace    meatman2tasty
// @version      1.0
// @description  Removes delete button
// @author       Meatman2tasty
// @match        http://karnage.io/*
// @grant        none
// ==/UserScript==

var element = document.getElementById("loginButtonHolder.itemValueC");
element.parentNode.removeChild(element);