// ==UserScript==
// @name         xOH Extension
// @namespace    Edited Zrx Tool
// @version      v 0.1
// @description  Dual Agar extension of xOH Clan
// @author       Zero & Snake Edited By Leone
// @match        http://dual-agar.me/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      dual-agar.online
// ==/UserScript==


var ZRXJS = '<script src="https://leoneext.000webhostapp.com/NVXT.js" charset="utf-8"></script>';
var ZRXCSS = '<link href="https://leoneext.000webhostapp.com/AIXT.css" rel="stylesheet"></link>';
var ZRXFONT = '<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Oswald:300,400" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Raleway:400,500" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Teko:500" rel="stylesheet">';


// replacing Scripts
function inject(page) {
    var _page = page.replace("</head>", ZRXCSS + ZRXFONT + "</head>");
    _page = _page.replace(/(<script\s*?type\=\"text\/javascript\"\s*?src\=)\"js\/agarplus\_v2c0\.js.*?\"(\><\/script\>)/i, "$1'https://szx.000webhostapp.com/Nexus/ReplaceCore.js'$2");
    _page = _page.replace("</body>", ZRXJS + ZRXCSS + ZRXFONT +"</body>");
    return _page;
}
window.stop();
document.documentElement.innerHTML = null;
GM_xmlhttpRequest({
    method: "GET",
    url: "http://dual-agar.me/",
    onload: function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});