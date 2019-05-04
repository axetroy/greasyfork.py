// ==UserScript==
// @name       Nu arata torrentele inchise in lista
// @namespace  tmd
// @version    0.3
// @description  enter something useful
// @include     *torrentsmd.*/browse.php*
// @copyright  2014, drakulaboy
// @icon         http://i.imgur.com/uShqmkR.png
// @require     http://code.jquery.com/jquery-1.10.2.js
// ==/UserScript==
var torclose = $('.tableTorrents b[title="Închis"]');
    torclose.closest('tr').hide();