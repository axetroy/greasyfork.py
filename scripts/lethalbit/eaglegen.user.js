// ==UserScript==
// @name         eaglegen
// @namespace    https://greasyfork.org/en/users/188971-lethalbit
// @version      0.1
// @description  Generate an EagleCAD part description from any digikey product page
// @author       lethalbit
// @match        https://www.digikey.com/product-detail/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var pdata = document.getElementById("prod-att-table").children[0];
    var pdesc = document.getElementById("product-details");


    var genarea = document.createElement("div");
    genarea.innerHTML = `
<div class="bota-headline">
    Generate Eagle Description
</div>
<div>
    <textarea id="geneaglebff" style="height: 150px;width: 97%;resize: none;"></textarea>
    <input type="button" id="geneaglebtn" value="Generate" class="button primary" style="width: 50%;margin: 5px 5px;"/>
</div>
    `;
    document.getElementById("rightcolumn").appendChild(genarea);
    var genbtn = document.getElementById("geneaglebtn");
    var genbff = document.getElementById("geneaglebff");
    genarea.style = "border: solid 1px #999;";
    genbtn.onclick = function(){
        var bdata = '';
        var mpn = pdesc.getElementsByTagName("tr")[3].children[1].children[0].content;


        bdata += '<b>' + mpn + '</b><br />';
        bdata += '<a href="' + window.location.href + '">Digikey Product Page</a><br />';
        bdata += '<table>';
        var pdc = pdata.children;
        for(var idx = 3; idx < pdc.length; idx++) {
            var row = pdc[idx];
            bdata += '<tr>';
            bdata += '<th>' + row.children[0].innerHTML + '</th>';
            bdata += '<td>' + row.children[1].innerHTML + '</td>';
            bdata += '</tr>';
        }
        bdata += '</table>';
        genbff.value = bdata;
    };
})();