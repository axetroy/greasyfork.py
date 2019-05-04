// ==UserScript==
// @name         ReaperX (PRIVATE SERVER EDITION)
// @namespace    ReaperX 1.0
// @version      1.0
// @description  Cik | Ogario / Fixed! (NOTE: theres nothing special it just makes you able to join private servers)
// @author       szymy // Sniikz // Cik Krin // ReaperYT
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io/ReaperX
// ==/UserScript==

// Copyright Ã‚Â© 2016 ogario.ovh
// Copyleft Ã‚Â© 2016 cikogar.tk



var ogarioJS = '<script src="http://apeks.cf/public/ext.js" charset="utf-8"></script>';
var ogarioSniffJS = '<script src="http://apeks.cf/public/sniff.js"></script>';
var ogarioCSS = '<link href="http://apeks.cf/public/public.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://apeks.cf/public/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://apeks.cf/public/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://apeks.cf/public/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://apeks.cf/public/toastr.min.css" rel="stylesheet"></link>';

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