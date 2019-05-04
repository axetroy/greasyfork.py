// ==UserScript==
// @name         Gaver.io Extension 2019 Macro Fast Mass Ejector and No lag, No ads, free play
// @namespace    gaver.io
// @description  hypext.tk
// @version      1.0
// @author       Hypext
// @match        http://gaver.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      gaver.io
// ==/UserScript==


// Dependencies
var gaverCSS = '<link href="http://hypext.tk/ext/style/style.css?v=' + Math.random() + '" rel="stylesheet"></link>';
var gaverEX = '<script src="http://hypext.tk/ext/js/extras.js?v=' + Math.random() + '"></script>';
var gaverJS = '<script src="http://hypext.tk/ext/js/core.js?v=' + Math.random() + '"></script>'
var gaverFB = '<script src="http://hypext.tk/ext/js/facebook.js?v=' + Math.random() + '"></script>';

function inject(page) {
    page = page.replace(/(<link.*?href=".*?style\.css.*?>)/, "$1" + gaverCSS);
    page = page.replace(/<script.*?src=".*?extras\.js.*?><\/script>/, gaverEX);
    page = page.replace(/<script.*?src=".*?core\.js.*?><\/script>/, gaverJS);
    page = page.replace(/<script.*?src=".*?facebook1\.js.*?><\/script>/, gaverFB);
    return page;
}

window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "http://gaver.io/",
    onload : function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});