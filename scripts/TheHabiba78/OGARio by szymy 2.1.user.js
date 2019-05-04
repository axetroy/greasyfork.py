// ==UserScript==
// @name         OGARio by szymy 2.1
// @namespace    ogario.v2
// @version      2.1.2
// @description  Unoffical Polish MOD
// @author       szymy
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright Â© 2016 ogario.ovh

if (typeof GM_info === "undefined" || GM_info.scriptHandler) {
    alert("Your browser does not support this version of OGARio by szymy. Please install the chrome version.");
} else {
    document.addEventListener("beforescriptexecute", function(event) {
        if (event.target.src.search("agario.core.js") != -1 || event.target.textContent.search("window.NREUM") != -1) {
            event.preventDefault();
            event.stopPropagation();
            event.target.parentNode.removeChild(event.target);
            document.removeEventListener("beforescriptexecute", this, true);
        }
    }, true);
    document.addEventListener("DOMContentLoaded", function(event) {
        function injectJS(src, onload, body) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = src;
			script.charset = 'utf-8';
			script.onload = onload;
			if (body) {
				document.body.appendChild(script);
				return;
			}
			document.head.appendChild(script);
		}
		function injectCSS(href) {
			var head = document.getElementsByTagName('head')[0];
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = href;
			head.appendChild(link);
		}
		injectCSS("http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.css");
		injectCSS("http://ogario.ovh/download/v2/dep/toastr.min.css");
		injectCSS("http://ogario.ovh/download/v21/ogario.v2.css?v=212");
		injectJS("http://ogario.ovh/download/v21/ogario.v2.sniff.js?v=212", null, false);
		injectJS("http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.js", null, false);
		injectJS("http://ogario.ovh/download/v2/dep/toastr.min.js", null, false);
		injectJS("http://ogario.ovh/download/v21/ogario.v2.js?v=212", null, true);
    }, true);
}