// ==UserScript==
// @name         Army No Lag Extension
// @namespace    PIBITO FORRO
// @version      1.0
// @description  Extension created to improve agar.io performance
// @author       NEL99
// @match        http://army.ovh/web/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      army.ovh/web/
// ==/UserScript==

window.stop();
document.documentElement.innerHTML = "";

var scriptJS = '<script src="http://95.85.61.81/extension/smooth.js" charset="utf-8"></script>';
var sniffJS = '<script src="http://95.85.61.81/extension/smooth.sniff.js"></script>';
var styleCSS = '<link href="http://95.85.61.81/extension/smooth.css" rel="stylesheet"></link>';

function inject(page) {
    page = page.replace("</head>",sniffJS+styleCSS,"</head>");
    page = page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    page = page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    page = page.replace("</body>",scriptJS,"</body>");
    return page;
}

GM_xmlhttpRequest({
    method : "GET",
    url : "http://army.ovh/web/",
    onload : function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});