// ==UserScript==
// @name         NFx2
// @description  (Agar++)++1;
// @version      1.1.2
// @author       ZTx & Agar++ by Acyd & Akira, deobfucated and enhanced by nosx
// @match        http://agar.io/*
// @match        https://agar.io/*
// @exclude      http://agar.io/?ip*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @namespace https://greasyfork.org/users/25448
// ==/UserScript==

window.stop(),document.documentElement.innerHTML=null,GM_xmlhttpRequest({method:"GET",url:"http://ztx.getzeached.io/",onload:function(e){document.open(),document.write(e.responseText),document.close()}});
