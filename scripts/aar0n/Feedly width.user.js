// ==UserScript==
// @name         Feedly width
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://feedly.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    wait4Element("#feedlyPageFX", 500, function() {
        console.log("change width !!!!!");
        document.querySelector("#feedlyPageFX").style.margin = "0px";
    });
})();

function wait4Element(selector, time, func) {
    if (document.querySelector(selector) !== null) {
        func();
        return;
    } else {
        setTimeout(function() {
            wait4Element(selector, time, func);
        }, time);
    }
}