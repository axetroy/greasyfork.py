// ==UserScript==
// @name         OWOT 1Warn
// @namespace    https://greasyfork.org/users/200700
// @version      0.1.1
// @description  Changes the duplicate JavaScript link warning to 1 popup
// @author       SuperOP535
// @match        *.ourworldoftext.com/*
// @grant        none
// ==/UserScript==

runJsLink = function(a) { if(confirm('Are you sure you want to run this javascript link?\n\n' + a.slice(0, 256))) { location.href = a; } };