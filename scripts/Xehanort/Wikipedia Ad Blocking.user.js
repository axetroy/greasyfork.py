// ==UserScript==
// @name         Wikipedia Ad Blocking
// @namespace    http://xehanort.alwaysdata.net
// @version      1.1
// @description  enter something useful
// @author       Xehanort
// @include      https://*.wikipedia.org/*
// @match        https://*.wikipedia.org/*
// @grant        none
// ==/UserScript==

var i = setInterval(function() {
    if (document.querySelector('#frbanner-close')) {
        document.querySelector('#frbanner-close').click()
        clearInterval(i);
    }
},100);