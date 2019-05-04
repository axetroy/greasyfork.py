// ==UserScript==
// @name         nbk.io No Lag Extension
// @namespace    https://www.youtube.com/c/NEL99Graphics
// @version      1.0
// @description  Extension created to improve agar.io performance
// @author       NEL99
// @match        http://nbk.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      nbk.io
// ==/UserScript==

window.stop();
document.documentElement.innerHTML = "";

var scriptJS = '<script src="http://95.85.61.81/extension/smooth.js" charset="utf-8"></script>';
var sniffJS = '<script src="http://95.85.61.81/extension/smooth.sniff.js"></script>';
var styleCSS = '<link href="http://95.85.61.81/extension/smooth.css" rel="stylesheet"></link>';

function inject(page) {
    page = page.replace("</head>",sniffJS+styleCSS,"</head>");
    page = page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    page = page.replace(/<script.*?src=".*?nbk.io\.core\.js.*?><\/script>/, "");
    page = page.replace("</body>",scriptJS,"</body>");
    return page;
}

GM_xmlhttpRequest({
    method : "GET",
    url : "http://nbk.io/",
    onload : function(ñ) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});