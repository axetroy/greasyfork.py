// ==UserScript==
// @name         roblox font update reverter
// @namespace    wtf
// @version      1.6
// @description  reverts the godawful font
// @author       You
// @match        https://www.roblox.com/*
// @grant        none
// @run-at        document-start
// ==/UserScript==

(function() {
    'use strict';



    var link = document.createElement("link"); //font is missing on some systems, so we have to make sure it exists
    link.href = "https://fonts.googleapis.com/css?family=Source+Sans+Pro:100,200,300,400,500,600,700,800,900";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);

	// below from: https://stackoverflow.com/questions/39346747/tampermonkey-script-run-before-page-load
	
    new MutationObserver(function(mutations) { //create mutation observer that will observe page changes as the page loads
        if (document.getElementsByClassName('gotham-font')[0]) { //check if any element with "gotham-font" class has been inserted
			var gothamFontElements = document.getElementsByClassName("gotham-font"); //get all elements with the "gotham-font" class
            var gothamFontArray = Array.from(gothamFontElements) //create an array from that so we can run .forEach
			gothamFontArray.forEach(function(a){ //run the function for each element with the "gotham-font" class
				a.className = a.className.replace("gotham-font", ""); //set its className to its className without gotham-font (replace gotham-font with just blank)
			});
        }
    }).observe(document, {childList: true, subtree: true}); //observe page changes as the page loads. this stops the ugly ass font from appearing for a split second and stops it from appearing altogether


})();