// ==UserScript==
// @name         华文细黑字体
// @version      2.1
// @description  修改默认字体为 STHeiti
// @author       Boyden
// @match        *://*/*
// @grant        none
// @run-at       document-start
// @namespace https://greasyfork.org/
// ==/UserScript==
(function() {
    var font =document.createElement("style");
    font.type="text/css";
    font.innerHTML = "*{font-family:STXihei!important}";
    var html = document.getElementsByTagName("head");
    if (html!==null)
    	html[0].appendChild(font);
})();