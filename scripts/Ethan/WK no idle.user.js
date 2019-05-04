// ==UserScript==
// @name         WK no idle
// @namespace    http://your.homepage/
// @version      0.1
// @description  Deletes the timeout element (If it causes problems I don't know about them)
// @author       Ethan
// @match        http*://www.wanikani.com/review/session
// @grant        none
// ==/UserScript==

var timeoutDiv = document.getElementById("timeout");

timeoutDiv.parentNode.removeChild(timeoutDiv);
