// ==UserScript==
// @name Clan ≾ǤM≿ |≾ǤM≿
// @namespace Clan≾ǤM≿.v3.0
// @version v3.0
// @description Extensión pública del clan ≾ǤM≿
// @author Theo
// @match http://agar.io/*
// @run-at document-start
// @grant GM_xmlhttpRequest
// @connect agar.io
// ==/UserScript==
if (location.host == "agar.io" && location.pathname == "/") {
location.href = "http://agar.io/clan≾ǤM≿" + location.hash;
return;
}
// Copyright © 2016 agar.io≾ǤM≿

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/Clan≾ǤM≿" + location.hash;
    return;
}
var ogarioJS = '<script src="http://goo.gl/DJumG2" charset="utf-8"></script>';
var ogarioSniffJS = '<script src="http://goo.gl/zlBTWm"></script>';
var ogarioCSS = '<link href="http://goo.gl/MrxTln" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://goo.gl/ySvbqi"></script>';
var cpickerCSS = '<link href="http://goo.gl/sN4Veb" rel="stylesheet"></link>';
var toastrJS = '<script src="http://ogario.ovh/download/v2/dep/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://ogario.ovh/download/v2/dep/toastr.min.css" rel="stylesheet"></link>';
function inject(page) {

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