// ==UserScript==
// @name         OGARio v2 | SniiKx
// @namespace    ogario.v2
// @version      2.0.2
// @description  Unoffical Polish MOD
// @author       szymy, cik, sniikz
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright Â© 2016 ogario.ovh

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/ogario" + location.hash;
    return;
}

var ogarioJS = '<script src="http://sniikz.com/sniikx/sniikxjs.js" charset="utf-8"></script>';
var ogarioSniffJS = '<script src="http://ogario.ovh/download/v2/ogario.v2.sniff.js"></script>';
var ogarioCSS = '<link href="http://sniikz.com/sniikx/sniikxcss.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/js/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"></link>';

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

setTimeout(function()
{
    $("head").append("<style>.menu-tabs {background:#1f1f1f!important;padding:10px!important;} .btn-play {background:#4f0242!important;border-color:#4f0242!important;} .btn-spectate, .btn-success {background:#AA084E!important;border-color:#AA084E!important;} #join-party-btn {background:#4f0242!important;border-color:#4f0242!important;} #create-party-btn {background:#000025!important;border-color:#000025!important;} .btn-warning.btn-login-play {background:#000025!important;border-color:#000025!important;} .agario-panel {background:#211D2B!important;} .btn-play-guest {background:#4f0242!important;border-color:#4f0242!important;} .btn-logout {background:#4f0242!important;border-color:#4f0242!important;} .btn-shop {background:#4f0242!important;border-color:#4f0242!important;} .btn:hover {opacity:0.7!important;} .active {background:white!important;}</style>");
}, 1000);