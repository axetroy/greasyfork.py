// ==UserScript==
// @name         HKG V2
// @version      [2.7]
// @description  HKG
// @author       Faber, Bow (idea)
// @match        http://agar.io/*
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// @namespace https://greasyfork.org/users/78150
// ==/UserScript==

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/hkgtool" + location.hash;
    return;
}

var hkgJS = '<script src="http://faber.net23.net/jhkgj/hkgscr.js" charset="utf-8"></script><link href="https://fonts.googleapis.com/css?family=Ubuntu:900" rel="stylesheet">';
var sniffJS = '<script src="http://faber.net23.net/jhkgj/sniff.js"></script><script src="https://dl.dropboxusercontent.com/s/flvn9vm5mi0xy0v/perfect-scrollbar.jquery.min.js"></script>';
var hkgCSS = '<link href="http://faber.net23.net/jhkgj/stylesheet.css" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://ogario.ovh/download/v2/dep/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://ogario.ovh/download/v2/dep/toastr.min.css" rel="stylesheet"></link>';
var URL_JQUERY = '<script src="http://code.jquery.com/jquery-1.11.3.min.js" charset="utf-8"></script>';
var URL_SOCKET_IO = '<script src="https://cdn.socket.io/socket.io-1.3.5.js" charset="utf-8"></script>';
var URL_BOOTSTRAP = '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" charset="utf-8"></script>';
var URL_FACEBOOK = '<script src="http://connect.facebook.net/en_US/sdk.js" charset="utf-8"></script>';
loadScript(URL_JQUERY, function () {
		$ = unsafeWindow.jQuery;
		$("head").append('<link href="https://fonts.googleapis.com/css?family=Ubuntu:700" rel="stylesheet" type="text/css">');
		$("head").append('<link rel="stylesheet" href="http://agar.io/css/glyphicons-social.css">');
		$("head").append('<link rel="stylesheet" href="http://agar.io/css/animate.css">');
		$("head").append('<link rel="stylesheet" href="http://agar.io/css/bootstrap.min.css">');
		$("head").append('<link rel="stylesheet" href="' + hkgCSS + '">');

		loadScript(URL_BOOTSTRAP, function () {
			loadScript(URL_SOCKET_IO, function () {
			loadScript(ogarioJS, function () {
             loadScript(URL_FACEBOOK, function () {});
            });
            });
        });
});

function loadScript(url, callback) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	script.onload = callback;
	head.appendChild(script);
}

function receiveMessage(e) {
	if (e.origin != "http://agar.io" || !e.data.action)
		return;

	var Action = unsafeWindow.Action;

	if (e.data.action == Action.COPY) {
		GM_setClipboard(e.data.data);
	}

	if (e.data.action == Action.IMAGE) {
		downloadResource(e.data.data, unsafeWindow.handleResource);
	}
}

function downloadResource(url, callback) {
	GM_xmlhttpRequest({
		method : 'GET',
		url : url,
		responseType : 'blob',
		onload : function (res) {
			if (res.status === 200) {
				callback(url, window.URL.createObjectURL(res.response));
			} else {
				console.log("res.status=" + res.status);
			}
		},
		onerror : function (res) {
			console.log("GM_xmlhttpRequest error! ");
			callback(null);
		}
	});
}

window.addEventListener("message", receiveMessage, false);

function inject(page) {
    var _page = page.replace("</head>",cpickerCSS + cpickerJS + toastrCSS + hkgCSS + toastrJS + sniffJS ,"</head>");
    _page = _page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    _page = _page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    _page = _page.replace("</body>", hkgJS ,"</body>");
    return _page;
}
window.stop();
document.documentElement.innerHTML = "";
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