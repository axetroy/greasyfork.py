// ==UserScript==
// @name         http://njnj.ru clipboard workaround
// @namespace    none
// @version      0.1
// @description  allow http://njnj.ru (Английская грамматика) to copy&paste
// @author       vike
// @include      /^http:\/\/njnj.ru\/.*$/
// @grant        none
// ==/UserScript==

var my_body = document.getElementsByTagName('body')[0];
my_body.onselectstart = function() { return true; }
my_body.oncopy = function() { return true; }
