CODE: // ==UserScript==
// @name 「¥Ɠℱ」
// @description  By Swanky
// @version 1.0
// @match http://agar.io/*
// @match https://agar.io/*
// @run-at document-start
// @grant GM_xmlhttpRequest
// @namespace
// @namespace
// @namespace
// @namespace https://greasyfork.org/es/users/22752-swanky
// ==/UserScript==

window.stop()
document.documentElement.innerHTML = null

GM_xmlhttpRequest({method: 'GET', url: 'http://ghostkillers.coolpage.biz/',
onload: function(r) {
document.open()
document.write(r.responseText)
document.close()
}
})