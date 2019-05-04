// ==UserScript==
// @name         Github - Similar repositories
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Similar repositories list button on Gthub.com based on http://www.yasiv.com/github
// @author       zerk
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

var a = document.querySelector(".pagehead-actions");
var b = document.createElement("li");
var url = "http://www.yasiv.com/github/#/costars?q="+location.href;
b.innerHTML = "<a href="+url+" aria-label=\"Show similar repositories on http://www.yasiv.com/github\" class=\"btn btn-sm tooltipped tooltipped-s\">Similar repos</a>";
a.insertBefore(b, a.firstChild);