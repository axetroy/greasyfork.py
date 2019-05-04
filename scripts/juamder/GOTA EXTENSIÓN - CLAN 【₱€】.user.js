// ==UserScript==
// @name         GOTA EXTENSIÓN - CLAN 【₱€】
// @version      1.0.9
// @namespace    theoxt.com
// @description  Peruvian Extension By Theo
// @raidcall	 11522949
// @discord		 https://discord.gg/c9Pv8YD
// @author       Theo & Swykz
// @match        http://gota.io/web/*
// @icon         https://i.imgur.com/zkqjlO2.jpg
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var SCRIPT = "http://theoxt.com/extensiones/gotapev109/core.js?v=" + new Date().getSeconds();
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