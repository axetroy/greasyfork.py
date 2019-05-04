// ==UserScript==
// @name         dotnet-snippets.de
// @namespace    https://dotnet-snippets.de/*
// @version      0.11
// @description  maximale Fensterbreite auf dotnet-snippets.de nutzen
// @author       chillchef
// @match        http*://dotnet-snippets.de/*
// @include      http*://dotnet-snippets.de/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementsByClassName("container")[0].style.width = "95%";
    document.getElementsByClassName("content")[0].style.width = "75%";
    document.getElementsByClassName("menu")[0].style.width = "auto";
    document.getElementsByClassName("footer")[0].style.backgroundSize = "100%";
})();