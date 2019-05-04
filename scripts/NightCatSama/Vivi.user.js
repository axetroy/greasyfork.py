// ==UserScript==
// @name         Vivi
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        http*://*.chaoxing.com/*
// @include      http*://mooc1-1.chaoxing.com/*
// @include      http*://mooc1-1.chaoxing.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
  	if (!!window.name) {
    	return false;
    };
  	
  	window.name = 'vivi';
    var nightcat = document.createElement('div');
    nightcat.style.cssText = 'position: fixed; top: 50px; left: 0; background-color: #f02f45; color: #fff; font-size: 14px; border-radius: 0 4px 4px 0; padding: 4px 10px; cursor: pointer;';
    nightcat.innerHTML = '喵';
    document.body.appendChild(nightcat);

    nightcat.onclick = function () {
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