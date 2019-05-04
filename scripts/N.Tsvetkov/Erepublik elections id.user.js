// ==UserScript==
// @name         Erepublik elections id
// @namespace    https://greasyfork.org/users/2402
// @version      0.2
// @description  try to take over the world!
// @author       You
// @include      https://www.erepublik.com/*/main/congress-elections*
// @connect      docs.google.com
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==

var $ = jQuery;
var bototaty = [];

function collect() {
    $('.nameholder a').each(function () {
        var id = $(this).attr('href').match(/[0-9]+$/);
        var nick = $(this).attr('title');
        if (nick != 'Party president') {
            bototaty.push("('" + nick + "', '" + id + "')");
        }
    })
    prompt('Копирай', bototaty);
}
(function() {
    'use strict';
    $("h2").after("<button class='collect'>Сканирай</button><br>\n");
    $(".collect").click(function () {
        collect();
    })
})();