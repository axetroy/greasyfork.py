// ==UserScript==
// @name         xDiep.io v3
// @description  Diep.io extension (sectored-minimap, zoom, play-with-friends, custom-theming, kill counter)
// @version      3.9
// @author       terjanq
// @match        http://diep.io/
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      diep.io
// @website      https://github.com/terjanq/xDiep.io/
// @namespace    https://greasyfork.org/scripts/21681-xdiep-io-v3/code/xDiepio%20v3.user.js
// ==/UserScript==

window.stop();

GM_xmlhttpRequest({
    method: "GET",
    url: "http://diep.io",
    onload: function(e) {
         document.open(), document.write("<script src='https://greasyfork.org/scripts/21682-head-js/code/headjs.js'></script>" + e.responseText), document.close();
    }
});
