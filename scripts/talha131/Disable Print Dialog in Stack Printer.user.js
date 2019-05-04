// ==UserScript==
// @name    Disable Print Dialog in Stack Printer
// @namespace   com.stackprinter.www
// @include http://www.stackprinter.com/*
// @version 1.0
// @grant   none
// @description Disable print dialog in Stack Printer site
// ==/UserScript==

window.print = function(){};