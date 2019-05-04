// ==UserScript==
// @name         hidemy.name proxy parser
// @namespace    tuxuuman:hideme-parser-proxy
// @version      0.1.1
// @description  parse proxy from site page
// @author       tuxuuman
// @match        https://hidemy.name/*/proxy-list/*
// @match        https://hidemyna.me/*/proxy-list/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    GM_registerMenuCommand('Parse', function() {
        var resultText = "";
        $('table.proxy__t>tbody>tr').each(function(i, e){
            var tr = $(e);
            var tdList = tr.children('td');
            var host = tdList.get(0).innerText;
            var port = tdList.get(1).innerText;
            resultText += host +':'+port+"<br>";
        });
        var newWin = window.open("about:blank", "Proxies", "width=400,height=300");
        newWin.document.write(resultText);
    });

})();