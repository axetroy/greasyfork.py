// ==UserScript==
// @name          Picarto.tv: Relocate following thumbnails
// @namespace     http://userstyles.org
// @description	  Relocate and resize thumbnails in the online following sidebar on the new (May/2018) Picarto.tv layout. Should be compatible with other styles as it only changes 4 values (moved right, up, and made visible).
// @author        JezuzX
// @homepage      https://userstyles.org/styles/147438
// @include       https://picarto.tv/communities/explore
// @run-at        document-start
// @version       0.20180509011305
// ==/UserScript==
(function() {var css = ".ps {overflow: visible !important;} .followPreview {left: 212px !important; top: -26px !important; width: 300px !important; animation-duration: .5s !important;} .followPreviewTop {top: -196px !important;}";
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