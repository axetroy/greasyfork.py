// ==UserScript==
// @name         Youtube Remove Recommended
// @namespace    http://nothing.net
// @version      0.1
// @description  Script that removes the "Recommended" section on youtube main page
// @author       ctcrnitv
// @match        https://www.youtube.com/
// @grant        none
// ==/UserScript==
'use strict';

// Your code here...

(function main() {
    var targetSection = "Recommended";
    var sections = document.getElementsByClassName("branded-page-module-title-text");

    for(var i = 0; i < sections.length; i++) {
        if(sections[i].innerHTML === targetSection) {
            sections[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
    }
}());
