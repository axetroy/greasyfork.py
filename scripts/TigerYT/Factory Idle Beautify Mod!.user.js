// ==UserScript==
// @name         Factory Idle Beautify Mod!
// @namespace    Factory Idle Beautify Mod!
// @version      1
// @description  Cleans up the game, makes it bigger and makes it look way better
// @author       TigerYT
// @match        *://factoryidle.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {var css = [
	"div[style*=float] {",
	"    display: none;",
	"}",
	"",
	"#gameArea {",
	"    width: 100%;",
	"    position: absolute;",
	"    bottom: 100px;",
	"}",
	"",
	".topContainer, ",
	".componentsBox,",
	".overviewContainer  {",
	"    background: rgba(0,0,0,0.6);",
	"    border-radius: 10px;",
	"    padding: 20px;",
	"    margin-bottom: 0px;",
	"    margin-right: 20px;",
	"    float: left;",
	"}",
	"",
	".topContainer {",
	"    width: 300px !important;",
	"    height: 45% !important;",
	"    position: absolute;",
	"    bottom: 285px;",
	"    left: -67px;",
	"} ",
	"",
	".componentsBox {",
	"    width: 300px !important;",
	"    position: absolute;",
	"    bottom: -75px;",
	"    left: -67px;",
	"}",
	"",
	".overviewContainer {",
	"    width: 300px !important;",
	"    position: absolute;",
	"    bottom: 110px;",
	"    left: -67px;",
	"}",
	"",
	".runningInBackgroundInfoUi, ",
	".runningInBackgroundInfoUiBg {",
	"    display: none !important;",
	"}",
	"",
	"* {",
	"    border: none !important;",
	"}",
	"",
	"html {",
	"    overflow: hidden;",
	"}",
	"",
	".menuBox a:hover {",
	"    background: rgba(255,255,255,0.03);",
	"    border-radius: 10px;",
	"}",
	"",
	"",
	".menuBox {",
	"    margin-bottom: 20px;",
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