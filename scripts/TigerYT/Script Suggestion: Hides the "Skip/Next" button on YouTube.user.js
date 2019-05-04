// ==UserScript==
// @name         Script Suggestion: Hides the "Skip/Next" button on YouTube
// @namespace    Script Suggestion: Hides the "Skip/Next" button on YouTube
// @description  Hides the "Skip/Next" button on YouTube
// @version      1
// @match        *://www.youtube.com/*
// ==/UserScript==

(function() {var css = [
	".ytp-button.ytp-next-button {",
	"    display: none!important;",
	"  }"
].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();