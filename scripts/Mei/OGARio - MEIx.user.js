// ==UserScript==
// @name         OGARio - MEIx
// @namespace    ogario.le
// @version      3.0
// @description  Added new features
// @author       OGARio by szymy edits in-game by Mei
// @match        http://agar.io/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

var ogarioJS = '<script src="http://googledrive.com/host/0B3YNEq5QYPgmcmdla3FfaDgxSU0"></script>';
var ogarioSniffJS = '<script src="http://ogario.ovh/le/ogario.sniff.js"></script>';
var ogarioCSS = '<link href="http://ogario.ovh/le/ogario.le.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/js/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>';
var toastrCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"></link>';
var MJS = '<script src="http://googledrive.com/host/0B3YNEq5QYPgmcnRNN21pdWlWX3c"></script>';

// Inject OGARio LE
function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS + MJS +"</head>");
    _page = _page.replace("agario.core.js", "");
    _page = _page.replace("</body>", ogarioJS +"</body>");
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
