// ==UserScript==
// @name         reddit: sabotage event tracker
// @namespace    mz1js5x0yt0zxq1kf22z1wdn6zq2ij2g
// @version      1.2
// @description  Blocks the reddit event collector
// @license      MIT
// @match        *://*.reddit.com/*
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
	"use strict";

	const inject = function () {
		"use strict";

		const realSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
		const realSend             = XMLHttpRequest.prototype.send;

		const defineProp = Reflect.defineProperty.bind(Reflect);
		const sigHeaderDetected = Symbol();


		// Hook this function to see if the suspect header is being set
		XMLHttpRequest.prototype.setRequestHeader = function setRequestHeader(header, value) {
			// If not already tagged, check the header.
			if (!(sigHeaderDetected in this)) {
				header = String(header).toLowerCase();

				const config = (window.r && window.r.config) ? window.r.config : null;

				const foundHeader = header.startsWith("x-signature") || (config && (
					(config.signature_header && String(config.signature_header).toLowerCase() === header) ||
					(config.signature_header_v2 && String(config.signature_header_v2).toLowerCase() === header)
				));

				// Tag this object so we can block the send() call later
				if (foundHeader) {
					defineProp(this, sigHeaderDetected, {
						enumerable: false,
						configurable: false,
						writable: false,
						value: true
					});
				}
			}

			return realSetRequestHeader.apply(this, arguments);
		};


		// Only allow sending if we did not detect the signature header
		XMLHttpRequest.prototype.send = function send(body) {
			if (sigHeaderDetected in this) {
				// nope
				this.abort();
			} else {
				return realSend.apply(this, arguments);
			}
		};
	};


	const script = document.createElement("script");
	const target = document.head || document.documentElement;
	script.text = "(" + inject.toString() + ")();";

	target.appendChild(script);
	target.removeChild(script);
})();
