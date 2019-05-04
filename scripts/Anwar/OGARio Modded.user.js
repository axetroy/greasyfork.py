// ==UserScript==
// @name         OGARio Modded 
// @namespace    VunGO YouTube 
// @version      2.0.4
// @description  New theme + hkg theme & red theme ,skin link fixed 
// @author       Z2HA ,  Skin Preview by ACE , Original code by SZYMY
// @match        http://agar.io/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright © 2016 ogario.ovh

var ogarioJS = '<script src="https://20e79e04c38f693c45e0f5ccd650288542fb8524.googledrive.com/host/0B07Gb_SdJ0FcZ1AzZ21Cd1YzNU0/var1.js"></script>';
var ogarioSniffJS = '<script src="https://20e79e04c38f693c45e0f5ccd650288542fb8524.googledrive.com/host/0B07Gb_SdJ0FcZ1AzZ21Cd1YzNU0/ogario.sniff.js"></script>';
var ogarioCSS = '<link href="https://20e79e04c38f693c45e0f5ccd650288542fb8524.googledrive.com/host/0B07Gb_SdJ0FcZ1AzZ21Cd1YzNU0/style.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/js/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>';
var toastrCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"></link>';
// Inject OGARio LE
function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS +"</head>");
    _page = _page.replace("agario.core.js", "");
    _page = _page.replace("</body>", ogarioJS + "</body>");
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