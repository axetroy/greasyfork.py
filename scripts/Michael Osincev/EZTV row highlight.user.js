// ==UserScript==
// @name         EZTV row highlight
// @namespace    mikeos
// @version      0.1
// @description  Highlights row on hover
// @author       Michael Osincev
// @include        *eztv*
// @grant        none
// ==/UserScript==

var style = document.createElement("style");
style.innerHTML = '[name="hover"]:hover,.forum_header_border:hover{background:#fff!important;}';
document.getElementsByTagName("body")[0].appendChild(style);