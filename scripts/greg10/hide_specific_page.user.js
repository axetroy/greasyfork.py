// ==UserScript==
// @name        hide_specific_page
// @namespace   hide_specific_page.user.js
// @include     https://example.com/shitei/shita/page.html
// @run-at      document-end
// @author      greg10
// @license     GPL 3.0
// @version     0.1
// @grant       none
// @description 指定したページで指定した要素を非表示にする
// ==/UserScript==

console.log("hide_specific_page start");

var obj = document.querySelector(".classname");
obj.style.display = "none";


