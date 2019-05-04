// ==UserScript==
// @name        Steam: Auto-submit Family View PIN
// @namespace   jycaplsilxrklkcsoamspgyiwilbprtd
// @description Remembers and automatically submits your Family View PIN
// @license     MIT License
// @match       *://steamcommunity.com/*
// @match       *://store.steampowered.com/*
// @version     1.1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @run-at      document-end
// ==/UserScript==

/* jshint bitwise: true, curly: true, eqeqeq: true, esversion: 6,
funcscope: false, futurehostile: true, latedef: true, noarg: true,
nocomma: true, nonbsp: true, nonew: true, notypeof: false,
shadow: outer, singleGroups: true, strict: true, undef: true,
unused: true, varstmt: true, browser: true */
/* globals GM_getValue, GM_setValue, GM_deleteValue */

(function () {
	"use strict";

	// Double-check the hostname just so we're extra
	// sure we're not sending the PIN to other sites.
	// Greasemonkey can be tricked into running
	// scripts on different sites, like this:
	// http://example.org/?://steamcommunity.com/
	if (location.hostname !== "steamcommunity.com" && location.hostname !== "store.steampowered.com") {
		return;
	}


	const form = document.getElementById("unlock_form");

	if (!form) {
		return;
	}


	let prefName = "pin";

	// Find account ID in the page
	const profileLink = document.querySelector("[data-miniprofile]");

	if (profileLink) {
		prefName += profileLink.dataset.miniprofile;
	}

	const pin = GM_getValue(prefName);


	if (!pin) {
		// We don't have a PIN so we can't auto-unlock yet.
		// Try to capture it for next time.
		const capturePIN = function () {
			GM_setValue(prefName, String(form.elements.pin.value));
		};

		form.addEventListener("submit", capturePIN, { capture: true, passive: true });

		if (form.elements.submit_btn) {
			form.elements.submit_btn.addEventListener("click", capturePIN, { capture: true, passive: true });
		}
	} else {
		// Send unlock request, forcing HTTPS. May be
		// cross-origin because of HTTP and HTTPS mismatch.
		// Valve's broken CORS implementation will redirect preflight requests
		// to the login page, so this MUST NOT trigger one.
		// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
		const postData = new FormData();
		postData.set("pin", pin);

		fetch("https://" + location.host + "/parental/ajaxunlock", {
			method: "POST",
			mode: "cors",
			referrerPolicy: "strict-origin",
			credentials: "include",
			headers: { "Accept": "application/json" },
			body: postData
		})
		.then((response) => response.json())
		.then((json) => {
			if (json.success) {
				location.reload();
			} else if ("success" in json && json.eresult === 15) {
				// We got an explicit failure reply.
				// success is false and eresult is 15 (AccessDenied).
				// Assume the PIN has changed and delete it.
				GM_deleteValue(prefName);
			}
		});
	}
})();
