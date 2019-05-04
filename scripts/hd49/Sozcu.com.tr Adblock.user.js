// ==UserScript==
// @author         hd49
// @version        1.0.1
// @name 	   Sozcu.com.tr Adblock
// @include 	   http://www.sozcu.com.tr/*
// @include        http://*.sozcu.com.tr/*
// @description	   Sozcu Web Sitesi için Adblock Yönlendirmesini Engeller.
// @run-at 	   document-start
// @grant          none
// @namespace      https://greasyfork.org/users/9588
// ==/UserScript==

var canRunAds = new (function() {
    var x = true
    this.getX = function() { return x; };
})();

Object.defineProperty(window, "canRunAds", {
    value: true,
    writable: false
});