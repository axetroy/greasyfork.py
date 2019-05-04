// ==UserScript==
// @name         OGARio - xNEL99x Public Edition
// @namespace    http://xagar-scriptx.tk
// @version      2.0
// @description  OGARio Edited
// @author       szymy - NEL99
// @match        http://agar.io/*
// @include      https://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==


var ogarioJS = ['<script src="http://xagar-scriptx.tk/public/ogar-xnel99x.js"></script>'];
var ogarioSniffJS = '<script src="http://xagar-scriptx.tk/public/ogar.sniff-xnel99x.js"></script>';
var ogarioJsEdit = setTimeout(function(){$("head").append('<script type="text/javascript" src="http://googledrive.com/host/0B66yR_spsJnAWUFnN0xFcmZ5dmc"></script>');},1000);
var ogarioCSS = '<link href="http://xagar-scriptx.tk/public/ogar-xnel99x.css" rel="stylesheet"></link>';
var ogarioCssEdit = '<link href="http://googledrive.com/host/0B66yR_spsJnAYnpGRndVWUVqbkk" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/js/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>';
var toastrCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"></link>';

function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS + ogarioJsEdit + ogarioCssEdit ,"</head>");
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
