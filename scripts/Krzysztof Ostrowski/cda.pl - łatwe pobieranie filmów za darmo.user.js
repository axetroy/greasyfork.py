// ==UserScript==
// @name         cda.pl - łatwe pobieranie filmów za darmo
// @include      https://www.cda.pl/video/*
// @version      0.1
// @description  pobierz i miej lepsze życie
// @author       You
// @grant        none
// @namespace http://tampermonkey.net/
// ==/UserScript==

(function() {
    'use strict';
    var answer = confirm("Przejść do filmu?")
    if (answer) {
    if(window.location.href.search("cda.pl/video")!=-1){window.location.href=document.getElementsByTagName('html')[0].innerHTML.substring(document.getElementsByTagName('html')[0].innerHTML.search("preload=\"none\"") + 20, document.getElementsByTagName('html')[0].innerHTML.search("mp4")+3);}
    }
    })();