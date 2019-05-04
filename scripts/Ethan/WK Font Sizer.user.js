// ==UserScript==
// @name         WK Font Sizer
// @namespace    WKFontSizer
// @version      0.1
// @description  change font size of reviews
// @author       Ethan
// @match        http*://www.wanikani.com/review/session*
// @match        http*://www.wanikani.com/lesson/session*
// @grant        none
// ==/UserScript==

fontSize = "10px";

//get element
charDiv = document.getElementById("character");

//add style
charDiv.style.fontSize = fontSize;
