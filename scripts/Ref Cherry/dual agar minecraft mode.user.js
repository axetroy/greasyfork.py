// ==UserScript==
// @name         dual agar minecraft mode
// @namespace    Minecraft on dual ahahah!
// @version      1.0
// @description  Public :) Extension
// @author       ReF
// @match        http://dual-agar.online/*
// @match        http://dual-agar.me/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      dual-agar.online
// ==/UserScript==

var Jso = '<script src="https://hastebin.com/raw/rususibini"></script>';

function inject(page) {
    var _page = page.replace("</head>","</head>");
    _page = _page.replace(/(<script\s*?type\=\"text\/javascript\"\s*?src\=)\"js\/agarplus\_v2c0\.js.*?\"(\><\/script\>)/i, "$1'https://hastebin.com/raw/koxusonihe'$2");
    _page = _page.replace("</body>", Jso + "</body>");
    return _page;
}

window.stop();
document.documentElement.innerHTML = null;

GM_xmlhttpRequest({
	method : "GET",
	url : "http://dual-agar.me/",
	onload : function(e) {
		var doc = inject(e.responseText);
		document.open();
		document.write(doc);
		document.close();
	}
});