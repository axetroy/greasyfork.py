// ==UserScript==
// @name        root.cz - skryti reklamy na foru
// @description:cs Skryti reklamy na foru. Pozor, nejde o blokovani - obsah se nacte, ale nezobrazi se.
// @namespace   monnef.tk
// @include     /https?:\/\/forum\.root\.cz\/.*/
// @version     1
// @grant       none
// @require     http://cdn.jsdelivr.net/jquery/2.1.4/jquery.min.js
// @description Skryti reklamy na foru. Pozor, nejde o blokovani - obsah se nacte, ale nezobrazi se.
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$("div.poster a[href='http://www.root.cz/']:contains('Reklama')").closest(".windowbg2").hide();
