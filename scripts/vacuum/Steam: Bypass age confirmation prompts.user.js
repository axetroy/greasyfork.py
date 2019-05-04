// ==UserScript==
// @name         Steam: Bypass age confirmation prompts
// @namespace    steam
// @version      1.6
// @description  Suppresses age confirmations on Steam store pages and community hubs
// @license      MIT
// @match        *://steamcommunity.com/*
// @match        *://store.steampowered.com/agecheck/app/*
// @match        *://store.steampowered.com/app/*/agecheck*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
	"use strict";

	if (location.hostname === "store.steampowered.com") {
		// Set up long-lived cookies to bypass age verification
		var cookieOptions = "; path=/; max-age=315360000";
		var fiftyYearsAgo = ((Date.now() - 1576800000000) / 1000).toFixed();

		// This bypasses the "mature content - view page/cancel" screen.
		// Overrides the settings you set here: https://store.steampowered.com/account/preferences/
		document.cookie = "wants_mature_content=1" + cookieOptions;
		// This bypasses the "enter your date of birth" screen.
		document.cookie = "birthtime=" + fiftyYearsAgo + cookieOptions;

		// Reload after making sure we're actually on a page with an age gate
		window.addEventListener("DOMContentLoaded", function () {
			if (document.getElementById("app_agegate")) {
				document.body.hidden = true;
				location.reload();
			}
		}, true);
	} else if (location.hostname === "steamcommunity.com") {
		// Patch Storage.getItem to return a fake value for all keys that look like age_gate_123.
		// This bypasses the mature content overlay on community hubs.
		var patchSessionStorage = function () {
			var overrideRegex = /^age_gate_\d+$/;
			var overrideValue = "1";

			var realGetItem = Storage.prototype.getItem;
			var realSessionStorage = window.sessionStorage;

			Storage.prototype.getItem = function getItem(key) {
				// If this is a call on sessionStorage and it matches
				// the pattern, override it
				if (this === realSessionStorage && overrideRegex.test(key)) {
					return overrideValue;
				}

				return realGetItem.apply(this, arguments);
			};
		};

		if (typeof unsafeWindow !== "undefined" && unsafeWindow !== window) {
			// We've been sandboxed against our will
			// Thanks, Greasemonkey
			var target = document.head || document.documentElement;
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.text = "(" + patchSessionStorage.toString() + ")();";
			target.appendChild(script);
			target.removeChild(script);
		} else {
			patchSessionStorage();
		}
	}
})();
