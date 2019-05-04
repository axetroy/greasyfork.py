// ==UserScript==
// @name YTS
// @version 1.0
// @description losTysDelAgar
// @match http://agar.io/*
// @match https://agar.io/*
// @run-at document-start
// @grant GM_xmlhttpRequest
// @namespace https://greasyfork.org/users/23084
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