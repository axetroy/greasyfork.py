// ==UserScript==
// @name         La presse without sports
// @name:fr      La presse sans les sports
// @namespace    http://tampermonkey.net/
// @version      0.4.4
// @description  Remove sports from lapresse.ca (also remove EXTRA and SUITE sections)
// @description:fr Enlève tout le contenu sport de site lapresse.ca
// @author       You
// @include      http://www.lapresse.ca/*
// @include      https://www.lapresse.ca/*
// @match        http://www.lapresse.ca
// @match        https://www.lapresse.ca
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var elt = document.getElementById("sectionsports");
    if(elt != null){
        elt.style.visibility = "hidden";
        elt.parentNode.removeChild(elt);
    }

    elt = document.querySelector("a.SPO");
    if(elt != null) elt.parentNode.removeChild(elt);


    [].forEach.call(
        document.querySelectorAll("section.SPO"),
        function (el) {
            el.style.visibility = "hidden";
        }
    );

    [].forEach.call(
        document.querySelectorAll("a.SPO"),
        function (el) {
            el.style.visibility = "hidden";
        }
    );

    [].forEach.call(
        document.querySelectorAll('a[href*="/sports/"]'),
        function (el) {
            el.style.visibility = "hidden";
        }
    );

    [].forEach.call(
        document.querySelectorAll(".xtra"),
        function (el) {
            el.style.visibility = "hidden";
            if(el != null) el.parentNode.removeChild(el);
        }
    );

    [].forEach.call(
        document.querySelectorAll(".promotion, .contribution"),
        function (el) {
            el.style.visibility = "hidden";
            if(el != null) el.parentNode.removeChild(el);
        }
    );

    //Optional: (remove the useless navigation bar at the top.
    elt = document.querySelector(".barreNav");
    if(elt != null) elt.parentNode.removeChild(elt);


    elt = document.querySelector(".visaCtn");
    if(elt != null) elt.parentNode.removeChild(elt);


})();
