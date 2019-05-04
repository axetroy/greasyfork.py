// ==UserScript==
// @name         OAG tool - Riroy
// @version      1.9.0.0.0.2
// @description  Agar ext! (agarplus.io ?)
// @author       2coolife | riroy
// @match        http://agar.io/
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// @namespace http://pastebin.com/JK1UuWRC
// ==/UserScript==

window.stop();
document.documentElement.innerHTML = "";
var csso = '<link href="http://2coolife.com/oagtool/main.css?v190" rel="stylesheet"></link>';
var jso = '<script src="http://2coolife.com/oagtool/oag.js?v190" charset="utf-8"></script></script><script src="http://pastebin.com/raw/9cZtsGux" charset="utf-8"></script>';
var socketio = '<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.5.1/socket.io.min.js"></script>';
var toastrjs = '<script src="http://dl.dropboxusercontent.com/s/uv4i5khrsujh48w/notify.min.js"></script>';
var tostrcss = '<link rel="stylesheet" href="http://dl.dropboxusercontent.com/s/2g0l3a28vupccm0/notify.css"></link>';
var perf_sc = '<script src="http://dl.dropboxusercontent.com/s/wif1glg6r5jazdj/perfect-scrollbar.jquery.min.js" charset="utf-8"></script>';
var cpickerjs = '<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.4.0/js/bootstrap-colorpicker.min.js"></script>';
var cpickercss = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.4.0/css/bootstrap-colorpicker.min.css">';
var fonts = '<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Oswald:300,400" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Raleway:400,500" rel="stylesheet">';

function injector(a){
    a = a.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/,"");
    a = a.replace(/"\/\/imasdk\.googleapis\.com\/js\/sdkloader\/outstream\.js"/i,"");
    a = a.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    a = a.replace("</head>", csso + socketio + toastrjs + tostrcss + perf_sc + cpickerjs + cpickercss + fonts + "</head>");
    a = a.replace("</body>", jso + "</body>");
    return a;
}
GM_xmlhttpRequest({
    method : "GET",
    url : "http://agar.io/",
    onload : function(e) {
        var html = injector(e.responseText);
        document.open();
        document.write(html);
        document.close();
    }
});