// ==UserScript==
// @name         MasterOgar V0.4
// @namespace    MasterOgar
// @version      0.4
// @description  MasterOgar | Rendgar
// @author       RENDY SAPUTRA
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright © 2016 MasterOgar

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/MasterOgar" + location.hash;
    return;
}
var ogarioJS = '<script src="http://hastebin.com/raw/exevisibam.tex" charset="utf-8"></script>';
var ogarioSniffJS = '<script src="http://ogario.ovh/download/v2/ogario.v2.sniff.js"></script>';
var ogarioCSS = '<link href="https://0a62dd9a6dfe0314ac82db38f8d26c8f7f699e27-www.googledrive.com/host/0B4sttheQ3SuPeHA3S09KaVZZaEE" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://ogario.ovh/download/v2/dep/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://ogario.ovh/download/v2/dep/toastr.min.css" rel="stylesheet"></link>';
var MasterOgarJS = '<script type="text/javascript" src="http://hastebin.com/raw/ebojasifut.coffee"></script>';

function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS + "</head>");
    _page = _page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    _page = _page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    _page = _page.replace("</body>", ogarioJS + MasterOgarJS + "</body>");
    return _page;
}
window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method: "GET",
    url: "http://agar.io/",
    onload: function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});
