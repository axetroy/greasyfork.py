// ==UserScript==
// @name          noAd TB
// @namespace     http://userstyles.org
// @description	  Tetris Battle on Facebook (without ads)
// @author        Borko
// @homepage      http://userstyles.org/styles/78173
// @include       http://apps.facebook.com/tetris_battle/*
// @include       https://apps.facebook.com/tetris_battle/*
// @include       http*://apps.facebook.com/tetris_battle/*
// @include       http://tbc.tetrisfb.com/*
// @include       https://tbc.tetrisfb.com/*
// @include       http*://tbc.tetrisfb.com/*
// @run-at        document-start
// @version 0.0.1.20141001134203
// ==/UserScript==
(function() {
var css = ".REMOVE ADDS {########}\n\n#mainnav-right, #mainnav-left, .fixedAux,.ad-container,#minibar-container,#footer,#contentCurve,\n.ego_section, .rhcFooterCopyright, .rhcFooterWrap, .canvasRecommended, #pagelet_canvas_nav_content,#rightCol, .pagelet_iframe_canvas_content\n{display:none !important;}\n\n.GAME WINDOW POSITION {########}\n\n#flash-container {\nmargin: 0px -130px 0px !important;\nbackground:none}\n\n#mainnav {\nmargin: 40px -130px 0px !important;\nbackground:none}\n\nbody.canvas #contentCol {\npadding-top: 1px;\n}\n\n.BACKGROUND {########}\n\n.hasRightCol { background: url('http://img.wallpapers.net:81/walls/tetris_3d-wide.jpg') repeat fixed center !important;}";
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
