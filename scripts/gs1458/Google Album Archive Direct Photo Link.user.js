// ==UserScript==
// @name         Google Album Archive Direct Photo Link
// @namespace    http://qqboxy.blogspot.com
// @version      0.4
// @description  Get Google Photo Direct Link
// @author       QQBoxy
// @match        *.googleusercontent.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var linkSplit = window.location.href.split("=");
    var param = linkSplit[0].match(/(w\d+\-h\d+)((?:\-[rw|p|no]+)+)/);
    if(linkSplit[1] !== "s0-tmp.jpg" && linkSplit.length>1) {
		linkSplit[0] = linkSplit[0] + "=s0-tmp.jpg";
		window.location.href = linkSplit[0];
	} else if(param) {
		linkSplit[0] = linkSplit[0].replace(param[0],"s0");
		window.location.href = linkSplit[0];
    }
})();