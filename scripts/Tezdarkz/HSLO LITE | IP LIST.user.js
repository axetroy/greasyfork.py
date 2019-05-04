// ==UserScript==
// @name         HSLO LITE | IP LIST
// @description:en HSLO LITE IP LIST
// @version      2.5
// @author       SZYMY | 2COOLIFE | GODHAND |  Nebula (Ip List)
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// @namespace https://greasyfork.org/users/21794
// @description HSLO LITE IP LIST
// ==/UserScript==

// Copyright © 2016 ogario.ovh | OAG

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/hslolite" + location.hash;
    return;
}
var fonts = '<link href="https://fonts.googleapis.com/css?family=Oswald:400,300" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet">';
var hsloJS = '<script src="http://hslo-lite.tk/HSLOLITE/main.js" charset="utf-8"></script>';
var hsloSniffJS = '<script src="http://hslo-lite.tk/HSLOLITE/sniff.js"></script>';
var hsloCSS = '<link href="http://hslo-lite.tk/HSLOLITE/style.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://ogario.ovh/download/v2/dep/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://ogario.ovh/download/v2/dep/toastr.min.css" rel="stylesheet"></link>';
var IPLISTJs = '<script src="http://exshadow.net/iplist.js"></script>';
function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + hsloCSS + cpickerJS + toastrJS + hsloSniffJS + fonts + "</head>");
    _page = _page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    _page = _page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    _page = _page.replace("</body>", hsloJS + IPLISTJs + "</body>");
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