// ==UserScript==
// @name        Fanatical skip age confirmation
// @description Removes the age verification prompt on Fanatical
// @namespace   bundlestars
// @match       *://*.fanatical.com/*
// @version     2
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function () {
	"use strict";

	try {
		localStorage.setItem("bsageGating", '{"success":true}');
	} catch (ignore) {}
})();
