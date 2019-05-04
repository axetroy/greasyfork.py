// ==UserScript==
// @name         Quizlet RTL fix hebrew
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fix hebrew on Quizlet
// @author       You
// @match        http://tampermonkey.net/index.php?version=4.3.6&ext=dhdg&updated=true#features
// @grant        none
// @include      https://quizlet.com/*
// ==/UserScript==

// Your code here...
var d1 = document.getElementsByClassName("CardsItemInner-cell");
var arrayLength = d1.length;
for (var i = 0; i < arrayLength; i++) {
    d1[i].dir="auto";
}

var d2 = document.getElementsByClassName("CardsItemInner-cell image-adjacent");
var arrayLength = d2.length;
for (var i = 0; i < arrayLength; i++) {
    d2[i].dir="auto";
}

var d3 = document.getElementsByClassName("TestModeSection-questions");
var arrayLength = d3.length;
for (var i = 0; i < arrayLength; i++) {
    d3[i].dir="rtl";
}

var d4 = document.getElementsByClassName("UIRadio-fauxInput");
var arrayLength = d4.length;
for (var i = 0; i < arrayLength; i++) {
    d4[i].style.float="right";
}


