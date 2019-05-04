// ==UserScript==
// @name          Remove custom css on VOAT
// @include       https://voat.co/*
// @include       https://www.voat.co/*
// @description   Removes the dark custom CSS theme from subverses on VOAT.co
// @version       1.0.2
// @author        wOxxOm
// @namespace     wOxxOm.scripts
// @license       MIT License
// @run-at        document-start
// @grant         none
// @require       https://greasyfork.org/scripts/12228/code/setMutationHandler.js
// ==/UserScript==

[].forEach.call(document.querySelectorAll('#custom_css'), function(node) { node.remove() });

setMutationHandler(document, '#custom_css', function(nodes) {
	nodes.forEach(function(node) { node.remove() });
	if (!this.stopQueued) {
		this.stopQueued = true;
		document.addEventListener("DOMContentLoaded", this.disconnect.bind(this));
	}
	return true;
});
