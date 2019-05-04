// ==UserScript==
// @name         click aliexpress popup
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.aliexpress.com/*
// @grant        none
// ==/UserScript==

function click_close() {
    'use strict';
    var sel = document.querySelector("a.close-layer");
    if (sel != null){
        sel.click();
    }
}

window.addEventListener('load', click_close, false);

