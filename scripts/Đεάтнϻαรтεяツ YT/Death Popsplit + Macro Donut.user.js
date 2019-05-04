// ==UserScript==
// @name         Death Popsplit + Macro Donut
// @version      1.2.9
// @namespace    theoxt.com
// @description  Peruvian Extension By Theo - Macros, Hats, Skins, Animations, Smooth, more
// @raidcall	 11522949
// @discord		 https://discord.gg/c9Pv8YD
// @author       Theo & Swykz & Donut
// @match        popsplit.us*
// @icon         https://i.imgur.com/zkqjlO2.jpg
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var SCRIPT = "https://foroxt.com/extension/popsplit/theogotaextension_x3/core.js?v=" + Math.random();
var STYLE =  "https://foroxt.com/extension/popsplit/theogotaextension_x3/style.css?v=" + Math.random();

window.stop();
document.documentElement.innerHTML = "";
"popsplit" == location.host && "/" == location.pathname && (location.href = "popsplit.us crowns" + location.hash);
GM_xmlhttpRequest({
    method : "GET",
    url : "https://popsplit.us/", 
    onload : function(e) {
        var doc = injectFiles(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});

function injectFiles(page) {
	page = page.replace(/((<script>\s.*?var.*?<\/script>))/g, "");
    page = page.replace(/(<script.*?src=\"*?gota.*?\")/i, tagScript(SCRIPT));
    page = page.replace(/(<link.*?href="style.css.*?" \/>)/i, "$1" + tagStyle(STYLE));
    return page;
}

function tagScript(url) {
    return '<script src="' + url + '"';
}

function tagStyle(url) {
	return '<link rel="stylesheet" href="' + url + '" />';
}