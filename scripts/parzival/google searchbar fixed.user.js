// ==UserScript==
// @name        google searchbar fixed
// @namespace   localhost
// @description fixed position searchbar
// @include     https://www.google.pl/search*
// @version     1.0.2
// @grant       none
// ==/UserScript==

var cssContent = ".srp #searchform{position: fixed;top:10px;}#top_nav{position: fixed;width: 100%;z-index:50;background-color: #f1f1f1;box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.13);}#extabar{margin-top:38px;}#cnt > #rshdr{margin-bottom:38px;}#cnt{padding-top: 0px;}#sform{height: 60px;}#qbp.qbdp{position:fixed;}";
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = cssContent;
document.body.appendChild(css);