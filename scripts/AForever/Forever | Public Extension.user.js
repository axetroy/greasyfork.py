// ==UserScript==
// @name         Forever | Public Extension
// @namespace    Forever | Host  Public Extension
// @icon         http://i.imgur.com/FKoRavx.png
// @version      2.0.3
// @description  By Forever |
// @author       Cik | Edit Forever
// @match        http://agar.io/* 
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright © 2016 ogario.ovh
// Copyright © 2016 cikogar.tk

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/&5Forever" + location.hash;
    return;
}

var ogarioJS = '<script src="http://apeks.cf/public/ext.js" charset="utf-8"></script>';
var ogarioSniffJS = '<script src="https://googledrive.com/host/0B-rarv9FlL8-REtlS1lXQW9TNmc/sniff.js"></script>';
var ogarioCSS = '<link href="https://googledrive.com/host/0B-rarv9FlL8-REtlS1lXQW9TNmc/public.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/js/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"></link>';
var UPDATE = "<script>alert('Extension edit forever by: Cik and szymy');</script>";
var UPDATE = "<script>alert('Please do not copy Extension');</script>";
var x = location.pathname;
var x = location.hash;

function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS + location.pathname + location.hash + "</head>");
    _page = _page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    _page = _page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    _page = _page.replace("</body>", ogarioJS + UPDATE +"</body>");
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