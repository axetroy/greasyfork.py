// ==UserScript==
// @name         Agarplus v2 Private Server
// @namespace    Agarplus
// @version      87
// @description  Funciona en servers privados
// @author       szymy, [acydwarp's design]
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright © 2016 ogario.ovh

var ogarioJS = '<script src="http://sniikz.com/extensions/scripts/agarplus/main.js"></script><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet">';
var ogarioSniffJS = '<script src="http://sniikz.com/extensions/scripts/sniff.js"></script><script src="https://dl.dropboxusercontent.com/s/flvn9vm5mi0xy0v/perfect-scrollbar.jquery.min.js"></script>';
var ogarioCSS = '<link href="http://sniikz.com/extensions/scripts/agarplus/stylesheet.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.6/js/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.6/css/bootstrap-colorpicker.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"></link>';

function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS + "</head>");
    _page = _page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    _page = _page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    _page = _page.replace("</body>", ogarioJS + "</body>");
    return _page;
}

window.stop();
document.documentElement.innerHTML = "";
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
