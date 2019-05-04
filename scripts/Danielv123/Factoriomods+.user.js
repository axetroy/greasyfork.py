// ==UserScript==
// @name         Factoriomods+
// @namespace    Danielv123
// @version      0.1
// @description  Makes the site better, especially for people who have vision problems
// @author       You
// @match        https://mods.factorio.com/*
// @grant        none
// ==/UserScript==

// inject CSS
var node = document.createElement("style");
var text = document.createTextNode('.mod-page-info .mod-page-data-table {color:white;}' +
                                  '.mod-page-description > p {color:white;}' +
                                  '.sorter {color:white;}' +
                                  '.mod-card-summary {color:white !important;}' +
                                  '.mod-card-info {color:white;}' +
                                  '.mod-page-tabs li a {color:white !important;}' +
                                  '.mod-page-downloads-table {color:white !important;}' +
                                  'body {color:white !important;}');
node.appendChild(text);
document.body.appendChild(node);


// js stuff
if(document.location.pathname) {
    // coming later
}