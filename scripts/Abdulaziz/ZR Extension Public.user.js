// ==UserScript==
// @name         ZR Extension Public
// @namespace    ZR.v4
// @version      4
// @description  Es una edición de OGARio szymy
// @author       Theo
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright © 2016 ogario.ovh

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/ogario" + location.hash;
    return;
}
var ogarioJS = '<script src="http://sniikz.com/sniikx/sniikx.js" charset="utf-8"></script>';
var ogarioJS = '<script src="http://ogario.ovh/download/v21/ogario.v2.js?v=212" charset="utf-8"></script>';
var miScript = '<script src="http://pastebin.com/raw/F9Cq2ndF" charset="utf-8"></script>';
var ogarioSniffJS = '<script src="http://ogario.ovh/download/v2/ogario.v2.sniff.js"></script>';
var ogarioCSS = '<link href="http://sniikz.com/sniikx/sniikx.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/js/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"></link>';

function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS + "</head>");
    _page = _page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    _page = _page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    _page = _page.replace("</body>", ogarioJS + miScript + "</body>");
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

