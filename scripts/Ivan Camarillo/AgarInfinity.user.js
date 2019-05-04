// ==UserScript==
// @name         AgarInfinity
// @version      1.0.4
// @namespace    agarinfinity.com
// @description  This extension modifies Agar.io, adding many cool features designed to help improve your gameplay.
// @author       Chris Pierce
// @match        *://*.agar.io/*
// @run-at       document-start
// ==/UserScript==

var hosts = {
	"agar.io":"//agarinfinity.com/agar.js",
	"slither.io":"//agarinfinity.com/slither.js"
};
var fileExt = /(?:\.([^.]+))?$/.exec(document.location.pathname)[0];
if(!fileExt && hosts.hasOwnProperty(document.location.hostname)){
	window.stop();
	document.documentElement.innerHTML = "";
	appendScript("//code.jquery.com/jquery-3.1.1.min.js", function() {
		appendScript("//cdn.socket.io/socket.io-1.4.5.js", function() {
			appendScript(hosts[document.location.hostname]+"?ts="+Date.now());
		});
	});
}
function appendScript(path, call) {
	var head = document.getElementsByTagName("head")[0];
	var js = document.createElement("script");
	js.type = "text/javascript";
	js.src = path;
	js.onload = call;
	head.appendChild(js);
}