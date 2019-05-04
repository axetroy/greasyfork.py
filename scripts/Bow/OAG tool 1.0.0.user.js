// ==UserScript==
// @name         OAG tool 1.0.0
// @version      Open Beta
// @author       2coolife
// @description  made by 2coolife
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// @namespace https://greasyfork.org/users/78119
// ==/UserScript==

var MAIN_JS = '<script src="http://2coolife.com/oagtool/oag.js" charset="utf-8"></script>';
var MAIN_CSS = '<link href="http://2coolife.com/oagtool/main.css" rel="stylesheet"></link>';
var SOCKET_JS = '<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.5.1/socket.io.min.js"></script>';
var FONT = '<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet">';
var TOASTR_JS = '<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>';
var TOASTR_CSS = '<link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"></link>';
var PERF_SC = '<script src="http://dl.dropboxusercontent.com/s/wif1glg6r5jazdj/perfect-scrollbar.jquery.min.js" charset="utf-8"></script>';


function loadScript(h) {
    var t = h.replace("</head>", FONT + SOCKET_JS + TOASTR_JS + MAIN_CSS + PERF_SC + "</head>");
    t = t.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    t = t.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    t = t.replace(/<script.*?src="\/\/imasdk\.googleapis\.com\/js\/sdkloader\/outstream\.js.*?><\/script>/, "");
    t = t.replace("</body>", MAIN_JS + "</body>");
    return t;
}

window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "http://agar.io/",
    onload : function(e) {
        var doc = loadScript(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});
