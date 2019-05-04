// ==UserScript==
// @name         OGARio by szymy v3
// @namespace    ogario.v3
// @version      3.0.0
// @description  Unoffical Polish MOD
// @author       szymy
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// © 2016 ogario.ovh

// Check location
if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/ogario" + location.hash;
    return;
}

// Dependencies
var ogarioCSS =     '<link href="http://cdn.ogario.ovh/v3/ogario.v3.css?v=300" rel="stylesheet"></link>';
var ogarioSniffJS = '<script src="http://cdn.ogario.ovh/v3/ogario.v3.sniff.js?v=300"></script>';
var ogarioJS =      '<script src="http://cdn.ogario.ovh/v3/ogario.v3.js?v=300" charset="utf-8"></script>';

var cpickerCSS = '<link href="http://cdn.ogario.ovh/static/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrCSS =  '<link href="http://cdn.ogario.ovh/static/css/toastr.min.css" rel="stylesheet"></link>';
var switchCSS =  '<link href="http://cdn.ogario.ovh/static/css/switchery.min.css" rel="stylesheet"></link>';
var rangeCSS =   '<link href="http://cdn.ogario.ovh/static/css/rangeslider.css" rel="stylesheet"></link>';
var perfectCSS = '<link href="http://cdn.ogario.ovh/static/css/perfect-scrollbar.min.css" rel="stylesheet"></link>';

var cpickerJS =  '<script src="http://cdn.ogario.ovh/static/js/bootstrap-colorpicker.min.js"></script>';
var toastrJS =   '<script src="http://cdn.ogario.ovh/static/js/toastr.min.js"></script>';
var switchJS =   '<script src="http://cdn.ogario.ovh/static/js/switchery.min.js"></script>';
var rangeJS =    '<script src="http://cdn.ogario.ovh/static/js/rangeslider.min.js"></script>';
var perfectJS =  '<script src="http://cdn.ogario.ovh/static/js/perfect-scrollbar.jquery.min.js"></script>';

// Inject OGARio
function inject(page) {
    page = page.replace("</head>", cpickerCSS + toastrCSS + switchCSS + rangeCSS + perfectCSS + ogarioCSS + cpickerJS + toastrJS + switchJS + rangeJS + perfectJS + ogarioSniffJS + "</head>");
    page = page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    page = page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    page = page.replace("</body>", ogarioJS + "</body>");
    return page;
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
