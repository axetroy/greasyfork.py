// ==UserScript==
// @name         HSLO LITE (lite.ext.io)
// @description  lite extesnion (no lag) 
// @version      1.0
// @author       2COOLIFE | HOSSEM
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// @icon         http://betogar.cf/h.gif
// @namespace https://greasyfork.org/users/48011
// ==/UserScript==

// Copyright © 2016 ogario.ovh | OAG

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/lite.ext.io" + location.hash;
    return;
}
var fonts = '<link href="https://fonts.googleapis.com/css?family=Oswald:400,300" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet">';
var hsloJS = '<script src="http://plus.totalh.net/main.js" charset="utf-8"></script>';
var hsloSniffJS = '<script src="http://betogar.cf/sniff.js"></script>';
var hsloCSS = '<link href="http://betogar.cf/stylee.css" rel="stylesheet"></link>';
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
