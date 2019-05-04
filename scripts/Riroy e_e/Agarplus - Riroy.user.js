// ==UserScript==
// @name         Agarplus - Riroy
// @namespace    https://pastebin.com/7xMpXgFt
// @description  APR
// @version      2.2
// @author       Agar.plus, Riroy
// @match        http://agar.io/*
// @match        https://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// ==/UserScript==
window.stop();
document.documentElement.innerHTML = null;
unsafeWindow.setClipBoard = GM_setClipboard;
var urlMaps = {
  '/': 'https://pastebin.com/raw/8BbaT2Wv',
   '/real': 'http://agar.io/'
};

var url = urlMaps[location.pathname] || urlMaps['/'];

GM_xmlhttpRequest({
  method: 'GET',
  url: url,
  onload: function(e) {
    document.open(), document.write(e.responseText), document.close()
  }
});

setTimeout(function() {
$("body").append('<script src="'+ URL_MY_EDIT +'" charset="utf-8"></script>');
},1000);