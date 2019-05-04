// ==UserScript==
// @name         greasyfork.org
// @namespace    http*://greasyfork.org/*
// @version      0.13
// @description  maximale Fensterbreite auf greasyfork.org nutzen
// @author       chillchef
// @match        http*://greasyfork.org/*
// @match        http*://sleazyfork.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    try
    {
        var e = document.getElementsByClassName("width-constraint");
        e[0].style.maxWidth = "95%"; //header
        e[1].style.maxWidth = "95%"; //content
    }catch(exp){}
    try{document.getElementById("browse-script-list").style.width = "100%";}catch(exp){} //suchergebnisse;
    try{document.getElementById("user-script-list").style.width = "100%";}catch(exp){} //suchergebnisse;
    try{document.getElementById("script-list-option-groups").style.width = "100%";}catch(exp){} //sidebar;
})();