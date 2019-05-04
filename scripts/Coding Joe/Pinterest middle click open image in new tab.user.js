// ==UserScript==
// @name         Pinterest middle click open image in new tab
// @namespace    FuckPinterest
// @version      0.5
// @description  Fixes pinterest middle click open image in new tab
// @author       codingjoe
// @match        *.pinterest.com/*
// @include      *.pinterest.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// dollar sign alias the querySelectorAll function
var $ = function (inpt) {
    return document.querySelectorAll(inpt);
};

(function() {
    'use strict';
    document.addEventListener("click", function(e){ e.button===1 && e.stopPropagation(); }, true);

    window.addEventListener("mousemove", function (e) {
        var element = e.target;

        while (element !== null && element.tagName !== undefined && element.tagName.toString().toLowerCase() !== "a") {
            element = element.parentNode;
        }

        if (element !== null && element.tagName !== undefined && element.tagName.toString().toLowerCase() === "a") {
            element.style.cursor = "pointer";
        }
    });
})();