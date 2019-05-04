// ==UserScript==
// @name         ☪ℛℭ✯ - official ext.! v2
// @namespace    by jose
// @version      2.5.7
// @description  ☪ℛℭ✯ - v2
// @author       jose
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// @icon         http://i.imgur.com/GBXmeft.png
// ==/UserScript==

// Copyright © jose

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/Rc" + location.hash;
    return;
}
var ogarioJS = '<script src="https://17e4035d24a449521799648de628411ba1fa576a-www.googledrive.com/host/0B4sttheQ3SuPSjRLRzVsbXM1ejQ" charset="utf-8"></script>';
var ogarioSniffJS = '<script src="http://ogario.ovh/download/v2/ogario.v2.sniff.js"></script>';
var ogarioCSS = '<link href="https://0a62dd9a6dfe0314ac82db38f8d26c8f7f699e27-www.googledrive.com/host/0B4sttheQ3SuPeHA3S09KaVZZaEE" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://ogario.ovh/download/v2/dep/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://ogario.ovh/download/v2/dep/toastr.min.css" rel="stylesheet"></link>';
var joseJS = '<script type="text/javascript" src="https://472c7ead1a257fce913ef13c855e4efc940242db-www.googledrive.com/host/0B4sttheQ3SuPdk95TG1EQ0Y5TFU"></script>';

function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS + "</head>");
    _page = _page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    _page = _page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    _page = _page.replace("</body>", ogarioJS + joseJS + "</body>");
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