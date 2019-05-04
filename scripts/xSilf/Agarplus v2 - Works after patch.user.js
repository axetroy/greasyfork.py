// ==UserScript==
// @name         Agarplus v2 - Works after patch
// @description  It works, no lie
// @version      87
// @author       szymy, [acydwarp's design]
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// @namespace https://greasyfork.org/users/58845
// ==/UserScript==

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/agarplus.io" + location.hash;
    return;
}
var ogarioJS = '<script src="http://sniikz.com/sniikx/main.js"></script><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet">';
var ogarioSniffJS = '<script src="http://sniikz.com/sniikx/sniff.js"></script><script src="https://dl.dropboxusercontent.com/s/flvn9vm5mi0xy0v/perfect-scrollbar.jquery.min.js"></script>';
var ogarioCSS = '<link href="http://sniikz.com/sniikx/stylesheet.css" rel="stylesheet"></link>';
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