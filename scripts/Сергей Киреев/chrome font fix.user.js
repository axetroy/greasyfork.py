// ==UserScript==
// @name          chrome font fix
// @namespace     http://userstyles.org
// @description	  Google Chrome Font Rendering Fix
// @author        lava
// @homepage      https://userstyles.org/styles/111304
// @run-at        document-start
// @version       0.20150309094210
// ==/UserScript==
(function() {var css = [
	"html, body {",
	"	-webkit-font-smoothing: subpixel-antialiased !important;",
	"	text-shadow: 0px 0px .1px rgba(0, 0, 0, .2) !important;",
	"	-webkit-text-stroke-width: 0.01px !important;",
	"}"
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
