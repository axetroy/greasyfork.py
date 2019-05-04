// ==UserScript==
// @name         TWE CLAN DUAL EXTENSION
// @namespace    dual-agar.online
// @version      V 2.0.0 
// @description  Dual Agar Extension 
// @author       Zero & Snake
// @match        http://dual-agar.online/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      dual-agar.online
// ==/UserScript==


var ZRXJS = '<script src="http://zrx.xp3.biz/ZrxOjs.js" charset="utf-8"></script>';
var ZRXCSS = '<link href="http://zrx.xp3.biz/ZrxOcss.css" rel="stylesheet"></link>';
var ZRXFONT = '<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Oswald:300,400" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Raleway:400,500" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Teko:500" rel="stylesheet">';



// replacing Scripts
function inject(page) {
    var _page = page.replace("</head>", ZRXCSS +ZRXFONT+  "</head>");
    _page = _page.replace("http://dual-agar.online/js/agarplus_v2c0.js", "");
    _page = _page.replace("</body>", ZRXJS +  ZRXCSS + ZRXFONT + "</body>");
    return _page;
}
window.stop();
document.documentElement.innerHTML = null;
GM_xmlhttpRequest({
    method : "GET",
    url : "http://dual-agar.online/",
    onload : function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});