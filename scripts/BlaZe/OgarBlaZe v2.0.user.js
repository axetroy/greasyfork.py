// ==UserScript==
// @name         OgarBlaZe v2.0
// @namespace    OgarBlaZe v2.0
// @version      2.0.6
// @description  OgarBlaZe
// @author       Original Ext: Szymy, Edit: BlaZe
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright © 2016 ogario.ovh & BlaZe (CaptainBlazeFTW) <3 I love you guys!
// Have fun deobfuscating and finding my links and scripts... have fun script stealers! <3
if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/OgarBlaZe" + location.hash;
    return;
}

var ogarioJS = '<script src="h' + 't' + 't' + 'p' + ':' + '/' + '/' + 'c' + 'l' + 'i' + 'm' + 'a' + 'x' + 'h' + 'o' + 's' + 't' + 'i' + 'n' + 'g' + '.com' + '/' + 'B' + 'l' + 'a' + 'Z' + 'e' + '/' + 'O' + 'g' + 'a' + 'r' + 'B' + 'l' + 'a' + 'Z' + 'e' + '/' + 'P' + 'u' + 'b' + 'l' + 'i' + 'c' + '/' + 'o' + 'g' + 'a' + 'r' + 'b' + 'l' + 'a' + 'z' + 'e' + '.js" charset="utf-8"></script>';
var ogarioSniffJS = '<script src="http://ogario.ovh/download/v21/ogario.v2.sniff.js"></script>';
var ogarioCSS = '<link href="h' + 't' + 't' + 'p' + ':' + '/' + '/' + 'c' + 'l' + 'i' + 'm' + 'a' + 'x' + 'h' + 'o' + 's' + 't' + 'i' + 'n' + 'g' + '.com' + '/' + 'B' + 'l' + 'a' + 'Z' + 'e' + '/' + 'O' + 'g' + 'a' + 'r' + 'B' + 'l' + 'a' + 'Z' + 'e' + '/' + 'P' + 'u' + 'b' + 'l' + 'i' + 'c' + '/' + 'o' + 'g' + 'a' + 'r' + 'b' + 'l' + 'a' + 'z' + 'e' + '.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://ogario.ovh/download/v2/dep/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://ogario.ovh/download/v2/dep/toastr.min.css" rel="stylesheet"></link>';

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