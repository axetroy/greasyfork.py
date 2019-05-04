// ==UserScript==
// @name        tapuz stop link ads
// @namespace   tapuzLink
// @description stops tapuz from replacing links in ads
// @include     http://www.tapuz.co.il/forums2008/*
// @version     1
// @grant       none
// @license     public domain http://unlicense.org/
// ==/UserScript==
$(document).ready(function() {
    setTimeout(function () {
       $('body').off('mousedown', 'a[href^=http], a[data-href^=http]');
    }, 2000);
});