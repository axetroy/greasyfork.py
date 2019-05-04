// ==UserScript==
// @name         Agarplus.io By P2W
// @version      IDK :D
// @namespace    ...
// @description  Nothing over here, hehe!
// @author       Agarplus.io Developers & P2W
// @match        http://agar.io/*
// @match        https://agar.io/*
// @run-at       document-start
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// ==/UserScript==
function loadScript(a, b) {
    var x = document.getElementsByTagName("head")[0], y = document.createElement("script");
    y.type = "text/javascript", y.src = a, y.onload = b, x.appendChild(y);
    var rd = $("center").replaceWith('<div align="middle" id="Radio" class="RadioClass" style="display: block;"><audio style="margin-middle: 3px" controls="" autoplay="" src="http://192.99.0.170:5529/;"><a href="music.html" target="radio" align="middle">');
    var lb = $("div.header").replaceWith('<div id="Agar.ioHeader" class="header" style="color:#FFFFFF; font-size:35px;"><b>Agar.io</b></div>');
    var fp = $("div.agario-panel.agario-side-panel.agarioProfilePanel.level.forums").replaceWith('<div class="agario-panel agario-side-panel agarioProfilePanel level forums" style="display: block !important;"<p></p></div>');
    var cp = $("div.agario-panel.agario-side-panel.agarioProfilePanel.level:nth-last-child(1)").after('<div id="NEL99YtChannelPanel" class="agario-panel agario-side-panel"></div>');
    var tt = $("div#mainPanel.agario-panel").prepend('<h2 id="NEL99Title" style="color:#00838f; text-align:center; font-size: 50px"><b>DrazX</b></h2><sup><h4 id="NEL99Subtitle" style="text-align:right">Edited By P2W</h4></sup>');
    var ds = $("div#profile-main").replaceWith('');
}
var VERSION = "2.0.0",
    $, URL_JQUERY = "http://code.jquery.com/jquery-1.11.3.min.js",
    URL_BOOTSTRAP = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js",
    URL_SOCKET_IO = "https://cdn.socket.io/socket.io-1.3.5.js",
    URL_FACEBOOK = "http://connect.facebook.net/en_US/sdk.js",
    URL_MAIN_OUT = "http://googledrive.com/host/0B66yR_spsJnAbnpGRXN3SHczbUk",
    URL_CSS_FILE = "http://googledrive.com/host/0B66yR_spsJnAWjVJSEtVVXNlb1U";
window.stop(), document.documentElement.innerHTML = null, "agar.io" == location.host && "/" == location.pathname && (location.href = "http://agar.io/agarplus.io" + location.hash), loadScript(URL_JQUERY, function () {
    $ = unsafeWindow.jQuery, $("head")
        .append('<link href="https://fonts.googleapis.com/css?family=Ubuntu:400,300,300italic,400italic,500,500italic,700,700italic" rel="stylesheet" type="text/css">'), $("head")
        .append('<link rel="stylesheet" href="http://agar.io/css/glyphicons-social.css">'), $("head")
        .append('<link rel="stylesheet" href="http://agar.io/css/animate.css">'), $("head")
        .append('<link rel="stylesheet" href="http://agar.io/css/bootstrap.min.css">'), $("head")
        .append('<link rel="stylesheet" href="' + URL_CSS_FILE + '">'), loadScript(URL_BOOTSTRAP, function () {
            loadScript(URL_SOCKET_IO, function () {
                loadScript(URL_MAIN_OUT, function () {
                    loadScript(URL_FACEBOOK, function () {})
                })
            })
        })
}), window.addEventListener("message", receiveMessage, !1);