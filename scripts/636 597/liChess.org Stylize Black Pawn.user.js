// ==UserScript==
// @name          liChess.org Stylize Black Pawn
// @namespace     http://userstyles.org
// @description	  lichessblackpawn
// @author        ceberous
// @homepage      https://creatitees.info
// @include       http://en.lichess.org/*
// @run-at        document-start
// @version       0.1
// ==/UserScript==

(function() {var css = [
	
	"",

	".pawn.black { background-image: url(\"http://i.imgur.com/XOVxjcB.png\")!important;}",

	"",
	
	

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
		document.documentElement.appendChild(node);
	}
}
})();




