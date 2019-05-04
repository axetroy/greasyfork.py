// ==UserScript==
// @name         ZRX tool (Fixed)
// @namespace    Full Version ZRX Release
// @version      v 2.0.7
// @description  Dual Agar Extension (ZRX Tool)
// @author       Zero & Snake
// @match        http://dual-agar.online/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      dual-agar.online
// ==/UserScript==


var ZRXJS = '<script src="https://szx.000webhostapp.com/ZRx/ZrxV2.js" charset="utf-8"></script>';
var ZRXCSS = '<link href="https://szx.000webhostapp.com/ZRx/ZrxV2.css" rel="stylesheet"></link>';
var ZRXFONT = '<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Oswald:300,400" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Raleway:400,500" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Teko:500" rel="stylesheet">';



// replacing Scripts
function inject(page) {
    var _page = page.replace("</head>", ZRXCSS + ZRXFONT + "</head>");
    _page = _page.replace(/(<script\s*?type\=\"text\/javascript\"\s*?src\=)\"js\/agarplus\_v2c0\.js.*?\"(\><\/script\>)/i, "$1'https://szx.000webhostapp.com/Nexus/ReplaceCore.js'$2");
    _page = _page.replace("</body>", ZRXJS + ZRXCSS + ZRXFONT + "</body>");
    return _page;
}
window.stop();
document.documentElement.innerHTML = null;
GM_xmlhttpRequest({
    method: "GET",
    url: "http://dual-agar.online/",
    onload: function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});