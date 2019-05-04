// ==UserScript==
// @name         my mod :D
// @namespace    http://tampermonkey.net/
// @version      2.0.12
// @description  try to take over the world!
// @author       Death
// @match        *https://gota.io/web/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();var SCRIPT = "http://theoxt.com/extensiones/gotapev109/core.js?v=" + new Date().getSeconds();
var STYLE = "http://theoxt.com/extensiones/gotapev109/style.css?v=" + new Date().getSeconds();
var BOOTSTRAP_CSS = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css?v=" + new Date().getSeconds();
var BOOTSTRAP_JS = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js?v=" + new Date().getSeconds();
var ICONS = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css?v=" + new Date().getSeconds();

window.stop();
document.documentElement.innerHTML = "";
"gota.io" == location.host && "/" == location.pathname && (location.href = "http://gota.io/web/crowns" + location.hash);
GM_xmlhttpRequest({
    method : "GET",
    url : "http://gota.io/web/",
    onload : function(e) {
        var doc = injectFiles(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});

function injectFiles(page) {
	page = page.replace(/(<script.*?src=\"*?gota.*?\"><\/script>)/i, tagScript(BOOTSTRAP_JS) + tagScript(SCRIPT));
	page = page.replace(/(<link.*?href="style.css.*?" \/>)/i, "$1" + tagStyle(BOOTSTRAP_CSS) + tagStyle(ICONS) + tagStyle(STYLE));
	// page = page.replace(/(<script src=\'.*?recaptcha\/api.js\'.*?><\/script>)/i, "");
    return page;
}

function tagScript(url) {
	return '<script src="' + url + '"></script>';
}

function tagStyle(url) {
	return '<link rel="stylesheet" href="' + url + '" />';
}