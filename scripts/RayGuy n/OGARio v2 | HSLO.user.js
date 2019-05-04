// ==UserScript==
// @name         OGARio v2 | HSLO
// @namespace    HSLO
// @version      2.0.2
// @description  NIce
// @author       szymy, HSLO
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==


// Copyright © 2016 ogario.ovh | OAG

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/hslolite" + location.hash;
    return;
}
var fonts = '<link href="https://fonts.googleapis.com/css?family=Oswald:400,300" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet">';
var hsloJS = '<script src="http://oag-agar.tk/HSLOLITE/main.js" charset="utf-8"></script>';
var hsloSniffJS = '<script src="http://oag-agar.tk/HSLOLITE/sniff.js"></script>';
var hsloCSS = '<link href="http://oag-agar.tk/HSLOLITE/style.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://ogario.ovh/download/v2/dep/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://ogario.ovh/download/v2/dep/toastr.min.css" rel="stylesheet"></link>';

function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + hsloCSS + cpickerJS + toastrJS + hsloSniffJS + fonts + "</head>");
    _page = _page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    _page = _page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    _page = _page.replace("</body>", hsloJS + "</body>");
    return _page;
}

-