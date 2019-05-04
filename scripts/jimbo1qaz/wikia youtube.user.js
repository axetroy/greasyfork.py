// ==UserScript==
// @name        wikia youtube
// @namespace   wikia-monobook
// @description:en Automatically redirect Wikia video pages to the appropriate Youtube link.
// @include     *.wikia.com/wiki/File:*
// @version     1
// @grant       none
// @run-at      document-end
// @description Automatically redirect Wikia video pages to the appropriate Youtube link.
// ==/UserScript==
// @run-at      document-start
// @run-at      document-end
// @run-at      document-idle


if (window.playerParams && window.playerParams.jsParams && window.playerParams.jsParams.videoId) {
	location.replace('https://youtu.be/' + window.playerParams.jsParams.videoId);
}