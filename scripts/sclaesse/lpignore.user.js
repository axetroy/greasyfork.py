// ==UserScript==
// @name         lpignore
// @namespace    lastpassignore
// @version      0.1
// @description  Disables lastpass on input fields where not needed by adding the data-lpignore attribute to them
// @author       You
// @match        https://*.yahoo.com/*
// ==/UserScript==

var all_input = document.getElementsByTagName('input');
var arrayLength = all_input.length;
for (var i = 0; i < arrayLength; i++) {
    all_input[i].setAttribute('data-lpignore','true');
}