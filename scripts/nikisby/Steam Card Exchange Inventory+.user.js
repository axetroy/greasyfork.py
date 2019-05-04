// ==UserScript==
// @name         Steam Card Exchange Inventory+
// @namespace    nikisby
// @version      1.1
// @description  Fixes and adds some stuff to steamcardexchange.net Inventory page
// @run-at       document-idle
// @author       nikisby
// @match        http://www.steamcardexchange.net/index.php?inventory
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.0/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.25.4/js/jquery.tablesorter.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.25.4/js/jquery.tablesorter.widgets.min.js
// @grant        none
// ==/UserScript==

/*
   Before using this script, you should add a custom block filter to your browser's AdBlock/uBlock/etc.
   Filter text:
   www.steamcardexchange.net/include/design/js/jquery.tablesorter.min.js*
*/

/* 
   This is maximum set price value, all cheaper will be highlighted.
   You can edit it.
*/

var maxSetPrice = 50;

/* 
   DO NOT edit below
*/

(function() {var css = [
    ".tablesorter-default thead .headerSortDown, ",
    ".tablesorter-default thead .tablesorter-headerSortDown, ",
    ".tablesorter-default thead .tablesorter-headerDesc {",
    "    background-image: url(include/design/img/sorter/asc.gif);",
    "}",
    ".credits {",
    "    position: absolute;",
    "    left: 175px;",
    "    font-family: League Gothic, Arial;",
    "    font-size: 32px;",
    "    letter-spacing: 1px;",
    "}",
    ".tablesorter-default thead .headerSortUp, ",
    ".tablesorter-default thead .tablesorter-headerSortUp, ",
    ".tablesorter-default thead .tablesorter-headerAsc {",
    "    background-image: url(include/design/img/sorter/desc.gif);",
    "}"
].join("\n");
if (typeof GM_addStyle != 'undefined') {
 GM_addStyle(css);
 } else if (typeof PRO_addStyle != 'undefined') {
 PRO_addStyle(css);
 } else if (typeof addStyle != 'undefined') {
 addStyle(css);
 } else {
 var node = document.createElement('style');
 node.type = 'text/css';
 node.appendChild(document.createTextNode(css));
 var heads = document.getElementsByTagName('head');
 if (heads.length > 0) { heads[0].appendChild(node);
 } else {
 // no head yet, stick it whereever
 document.documentElement.appendChild(node);
 }
}})();

this.$ = this.jQuery = jQuery.noConflict(true);

$('#inventorylist > thead > tr').append('<th>Set Price</th>');

$('#inventorylist > tbody > tr > td:nth-child(4)').each(function(){
    var info = $(this).text().match(/(\d+)x \(\d+ of (\d+)/);
    var worth = $(this).prevAll().eq(1).text().replace('c', '');
    var sets = info[1];
    var cards = info[2];
    var price = cards * worth;
    $(this).after('<td>' + price + '</td>');
    if (sets <= 1) {
        $(this).parent().hide();
    }
    if ((sets > 1) && (price <= maxSetPrice)) {
        $(this).parent().css('background-color', '#638C2A');
    }
});

$("#inventorylist").tablesorter({
    sortList: [[4,0]],
    widgets: ['zebra']
});

$.get('http://www.steamcardexchange.net/index.php?profile', function(data) {
    var credits = $(data).find('#profile > div.content-box-topbar-large > span.right').text();
    $('#inventory-content > div.content-box-topbar-large > span').after('<span class="credits"> |&nbsp;&nbsp;&nbsp;YOU HAVE ' + credits + '</span>');
});