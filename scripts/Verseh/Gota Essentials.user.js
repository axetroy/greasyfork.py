// ==UserScript==
// @name         Gota Essentials
// @version      1
// @description:en To enchant Gota.io
// @namespace    Gota Essentials
// @author       Ben Hillis & Verseh
// @match        http://gota.io/web/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      gota.io
// ==/UserScript==

var wsdep = '<script src="https://cdn.socket.io/socket.io-1.0.0.js"></script>';
var hkgJS = '<script src="https://dl.dropboxusercontent.com/s/avqo7799fhbr6i4/gota.js"></script>';
var hkgCSS = '<link rel="stylesheet" href="https://dl.dropboxusercontent.com/s/btd7r8bxxsauhn1/gota.css"></link>';
function inject(hkg) {
    hkg = hkg.replace(/<script.*?src=".*?gota\.js.*?><\/script>/, "");
    hkg = hkg.replace("</head>", hkgCSS + wsdep + "</head>");
    hkg = hkg.replace("</body>", hkgJS + "</body>");
    return hkg;
}
window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "http://gota.io/web/",
    onload : function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});
$('link[href="style.css?v=0.9.8"]').remove();