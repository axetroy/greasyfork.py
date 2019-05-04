
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
// ==UserScript==
// @name         CruZh
// @version      1.0.2
// @namespace    https://www.youtube.com/channel/UCQUT8-dTK1rgGSeo1fiWHdQ
// @description  This extension modifies Agar.io, adding many cool features designed to help improve your gameplay.
// @author       Elias Ek
// @match        http://agar.io/*
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// ==/UserScript==
 
function loadScript(t, e) {
    var o = document.getElementsByTagName("head")[0];
    var a = document.createElement("script");
    a.type = "text/javascript", a.src = t, a.onload = e, o.appendChild(a);
}
var URL_JQUERY = "http://code.jquery.com/jquery-1.11.3.min.js";
var URL_SOCKET_IO = "https://cdn.socket.io/socket.io-1.3.5.js";
var URL_AGAR = "http://https://agar.com/agar.js?ts="+new Date().getTime();
var URL_SLITHER = "http://agar.cruzh/bots.com.js?ts="+new Date().getTime();
window.stop();
document.documentElement.innerHTML = "";
loadScript(URL_JQUERY, function() {
    loadScript(URL_SOCKET_IO, function() {
        if(location.hostname=='agar.io'){
            loadScript(URL_AGAR);
        }
    });
});