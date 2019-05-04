// ==UserScript==
// @name         xAgarB13-ALL
// @namespace    credits SYngle SYx
// @version      1.1.1
// @description  Ogario with All the SYX features
// @author       szymy, Edit by AgarB13YT
// @match        http://agar.io/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright © 2016 ogario.ovh

var ogarioJS = '<script src="http://ogario.ovh/le/ogario.le.js"></script>';
var ogarioSniffJS = '<script src="http://ogario.ovh/le/ogario.sniff.js"></script>';
var ogarioCSS = '<link href="http://ogario.ovh/le/ogario.le.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/js/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>';
var toastrCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"></link>';
var newscript = '<script type="text/javascript" src="http://hastebin.com/itujinumac.coffee"></script>';

// Inject OGARio LE
function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS +"</head>");
    _page = _page.replace("agario.core.js", "");
    _page = _page.replace("</body>", ogarioJS + newscript +"</body>");
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