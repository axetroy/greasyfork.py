// ==UserScript==
// @name         Kayzor-Ext-Skins
// @namespace    agar.io
// @version      1.0.0 (BETA)
// @description  All premium skins, all updates skins, Macros Feed and Unlimited boost
// @author       Kayzor & SNK
// @match        http://agar.io/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright © 2016 Kayzor-ext

var KZRJS = '<script src="kayzor-ext-snk.slut"></script>';
var ExtJS = '<script src="http://SNK/le/ext.js"></script>';
var cpickerJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/js/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>';
var toastrCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"></link>';
var extJS = '<script kzr="http://ext.notepad++.skins.premium.SNK></script>';

// Inject Skins 1.0
function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + Kayzor-ExtCSS + cpickerJS + toastrJS + SNKJS +"</head>");
    _page = _page.replace("agario.core.js", "");
    _page = _page.replace("</body>", Kayzor-ExtJS + newscript +"</body>");
    return _page;
}
window.stop();
document.documentElement.innerHTML = null;
GM_xmlhttpRequest({
	method : "GET",
	url : "http://agar.io/",
	onload : function(e) {
		var doc = inject(e.responseText);
		document.open();
		document.write(doc);
		document.close();
	}
});