// ==UserScript==
// @name         TG Extension
// @namespace    
// @version      0.2
// @description  Extension TG :D
// @author       Houb1
// @match        http://agar.io/*
// @match        https://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// ==/UserScript==

window.stop()
document.documentElement.innerHTML = null

GM_xmlhttpRequest({method: 'GET', url: 'http://finishx.xp3.biz/agar/',
  onload: function(r) {
    document.open()
    document.write(r.responseText)
    document.close()
  }
})