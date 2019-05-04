// ==UserScript==
// @name         Mobile Facebook Fixed Top Thingy
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       You
// @include      https://m.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        document.querySelector("#header").style.position = "fixed";
        document.querySelector("#MRoot").style.marginTop = "100px";
    }, 1000);

})();