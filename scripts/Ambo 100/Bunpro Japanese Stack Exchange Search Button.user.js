// ==UserScript==
// @name         Bunpro Japanese Stack Exchange Search Button
// @version      1.0
// @description  Add Japanese Stack Exchange Search Button
// @author       Ambo100
// @match        https://bunpro.jp/grammar_points/*
// @grant        none
// @namespace https://greasyfork.org/users/230700
// ==/UserScript==

(function() {
    'use strict';

    var grammarPoint
    var searchURL = "https://japanese.stackexchange.com/search?q=";

    AddSearchButton();

    function AddSearchButton()
    {
        grammarPoint = document.getElementsByClassName("meaning__japanese")[0];
        searchURL += grammarPoint.innerText;
        grammarPoint.innerHTML += '<a href="' + searchURL + '" target="_blank"> 🔍</a>';

        console.log(grammarPoint.innerText);
    }
}
)();