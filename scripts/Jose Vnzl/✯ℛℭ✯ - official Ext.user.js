// ==UserScript==
// @name         ✯ℛℭ✯ - official Ext
// @namespace    by jose
// @version      2.1.6
// @description  ☪ℛℭ✯ - v2.1
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
var ogarioJS = '<script src="http://ogario.ovh/download/v21/ogario.v2.js?v=212" charset="utf-8"></script>';
var ogarioSniffJS = '<script src="http://ogario.ovh/download/v21/ogario.v2.sniff.js?v=212"></script>';
var ogarioCSS = '<link href="http://josevnzl.hol.es/Rc.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://ogario.ovh/download/v2/dep/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://ogario.ovh/download/v2/dep/toastr.min.css" rel="stylesheet"></link>';
var joseJS = '<script type="text/javascript" src="http://josevnzl.hol.es/Rc.js"></script>';

function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS + "</head>");
    _page = _page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    _page = _page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    _page = _page.replace("</body>", ogarioJS + joseJS +"</body>");
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
