// ==UserScript==
// @name         Open live in youtube gaming
// @namespace    https://greasyfork.org/users/124677
// @description  If you open live in normal youtube, it will be redirected to youtube gaming
// @version      0.3
// @author       Pabli
// @match        https://www.youtube.com/*
// @run-at       document-start
// @require      https://greasyfork.org/scripts/12228/code/setMutationHandler.js
// @grant        none
// ==/UserScript==
setMutationHandler(document, '.ytp-live', nodes => {
	var url = location.href;
	var gaming = "https://gaming"+url.substr(11);
	location.href = gaming;
});