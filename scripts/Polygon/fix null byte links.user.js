// ==UserScript==
// @name         fix null byte links
// @include      *
// @version 1.0
// @namespace someone at reddit
// @grant        none
// @run-at       document-start
// @description don't get shot
// ==/UserScript==

var el = document.createElement("style");

el.innerHTML = `
    a[href*="%%30%30"],
    a[href*="%%3000"],
    a[href*="%%"]{
        pointer-events: none!important;
        color: yellow!important;
        background: red!important;
        background-color: red!important;
    }
`;

(document.head || document.documentElement).appendChild(el);