// ==UserScript==
// @name         52vivi
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  nothing
// @author       You
// @match        http*://*.chaoxing.com/*
// @include      http*://mooc1-1.chaoxing.com/*
// @include      http*://mooc1-1.chaoxing.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
  	if (self != top) {
    	return false;
    };

    document.body.onclick = function () {
        var el = document.getElementById('iframe').contentDocument.body.querySelector('iframe');
        var reader = el.contentDocument.body.querySelector('#reader');
        reader.onmouseup = function () {
            setTimeout(function () {
                reader.onmouseout = function (e) { e.preventDefault(); };
                el.contentWindow.onblur = function (e) { e.preventDefault(); };
                el.contentDocument.visibilityState = function (e) { e.preventDefault(); };
            }, 0);
        };
    };
})();