// ==UserScript==
// @name         Agar.Macros Extension by NEL99
// @version      1.0
// @namespace    agar.macros
// @description  Custom Macros for agar.io
// @author       NEL99
// @match        *://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

window.stop();
document.documentElement.innerHTML = "";

function pageEdits($b){
    $b = $b.replace(/<script\s*src="agario\.core\.js\?.*><\/script>/, "");
    $b = $b.replace("</body>",'<script charset="utf-8" src="//xnel99x-hosting.tk/macros/macros.js"></script>',"</body>");
    return $b;
}

GM_xmlhttpRequest({
    method: "GET",
    url: "http://agar.io/",
    onload: function($t){
        document.open();
        document.write(pageEdits($t.responseText));
        document.close();
    }
});