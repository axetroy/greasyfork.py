// ==UserScript==
// @name          Youtube Old Player 2015
// @namespace     http://userstyles.org
// @description	  it's not possible to have the old player of youtube only with stylish works only with CSS.
// @author        senka33
// @homepage      https://userstyles.org/styles/117291
// @run-at        document-start
// @version       0.20150804104038
// ==/UserScript==
(function() {var css = [
	"/* i really want this to be global */",
	"",
	"/* Version 1.0 by Senka",
	"- Bug : Progress bar & timer freezed if the mouse is not hover the video. no solution find",
	"YOUTUBE... NEED TO FIX IT !",
	"*/",
	"",
	"",
	"div.html5-video-player {padding-bottom:32px!important;}",
	"",
	"div.ytp-chrome-bottom {",
	"opacity:1 !important;",
	"z-index:9999 !important;",
	"width:100% !important;",
	"left: 0 !important;",
	"right: 0 !important;",
	"bottom:0px !important;",
	"padding: 0 !important;",
	"margin:0 !important;",
	"position:absolute !important;",
	"height:32px !important;",
	"background: #000000; /* Old browsers */",
	"background: -moz-linear-gradient(top,  #000000 0%, #303030 10%, #000000 100%); /* FF3.6+ */",
	"background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#000000), color-stop(10%,#303030), color-stop(100%,#000000)); /* Chrome,Safari4+ */",
	"background: -webkit-linear-gradient(top,  #000000 0%,#303030 10%,#000000 100%); /* Chrome10+,Safari5.1+ */",
	"background: -o-linear-gradient(top,  #000000 0%,#303030 10%,#000000 100%); /* Opera 11.10+ */",
	"background: -ms-linear-gradient(top,  #000000 0%,#303030 10%,#000000 100%); /* IE10+ */",
	"background: linear-gradient(to bottom,  #000000 0%,#303030 10%,#000000 100%); /* W3C */",
	"}",
	"div.ytp-chrome-controls:hover {opacity:1 !important;}",
	"span.ytp-time-display {display:block !important;line-height:32px !important;}",
	"",
	"div.ytp-chrome-controls {",
	"bottom:0px !important;",
	"height:32px !important;",
	"margin-bottom: 0px !important;",
	"padding-bottom: 0px !important;",
	"opacity:0.6 !important;",
	"}",
	"div.ytp-progress-bar-container {bottom:31px !important;}",
	"",
	"/* Ajustement du bloc description */",
	"div#watch-header {margin-top:30px !important;}"
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
