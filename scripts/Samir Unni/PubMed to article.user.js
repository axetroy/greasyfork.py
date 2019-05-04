// ==UserScript==
// @name         PubMed to article
// @namespace    http://www.github.com/srunni
// @version      0.1
// @description  Allows you to go from PubMed pages to the article itself by pressing the 'v' key
// @author       Samir Unni
// @include      http://www.ncbi.nlm.nih.gov/pubmed/*
// @grant        none
// ==/UserScript==


window.onkeydown = function(event) {
    if (event.keyCode === 86) {
        window.location.replace(document.querySelector(".linkoutlist ul li:first-child a").getAttribute("href"));
	}
};