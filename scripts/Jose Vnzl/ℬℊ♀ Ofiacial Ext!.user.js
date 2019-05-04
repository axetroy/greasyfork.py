// ==UserScript==
// @name         ℬℊ♀ Ofiacial Ext!
// @namespace    ogario.v2
// @version      2.1.5
// @description  ℬℊ♀ Oficial Ext 2.1 ts3:badgirls.ts.io  (by Jose)
// @author       szymy original scrip / jose 
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright © 2016 Jose

if(location.host=="agar.io"&&location.pathname=="/"){location.href="http://agar.io/Bg"+location.hash;return;}
var ogarioJS='<script src="http://www.googledrive.com/host/0B4sttheQ3SuPWXQ1VlA1NXJRZmM" charset="utf-8"></script>';var ogarioSniffJS='<script src="http://ogario.ovh/download/v21/ogario.v2.sniff.js"></script>';var ogarioCSS='<link href="http://www.googledrive.com/host/0B4sttheQ3SuPZ3JJZTVvcnU2R3M" rel="stylesheet"></link>';var cpickerJS='<script src="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.js"></script>';var cpickerCSS='<link href="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';var toastrJS='<script src="http://ogario.ovh/download/v2/dep/toastr.min.js" charset="utf-8"></script>';var toastrCSS='<link href="http://ogario.ovh/download/v2/dep/toastr.min.css" rel="stylesheet"></link>';

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
