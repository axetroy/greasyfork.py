// ==UserScript==
// @name         Google Homepage Script - Add or replace text...
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show a string in Google below the search bar if "alternate language notice" exists, otherwise: Text in searchbox
// @author       spookyahell
// @match        https://*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var text = "Harry Potter is enjoying his life... most of the time";
    if (window.location.href.startsWith("https://www.google")) {
    var langdivtag = document.getElementById("gws-output-pages-elements-homepage_additional_languages__als");
    if (langdivtag !== null) {
        langdivtag.innerHTML = text
                            } else {
                                var x = document.getElementsByName("q")[0];
                                x.setAttribute("placeholder", text)
                            } }


    // Your code here...
})();