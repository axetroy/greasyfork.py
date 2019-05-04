// ==UserScript==
// @name           Remove Ads from Google search
// @namespace      XcomeX
// @description    Removes ads from Google search result pages
// @version        0.3
// @author         XcomeX
// @include      /^https?://www\.google\./
// @grant          none
// ==/UserScript==

// Ad elements
var rhscol = document.getElementById("rhscol");
rhscol.remove();

var bottomads = document.getElementById("bottomads");
bottomads.remove();      

var tads = document.getElementById("tads");
tads.remove();    

var taw = document.getElementById("taw");
taw.remove();
