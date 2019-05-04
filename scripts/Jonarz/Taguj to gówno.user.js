// ==UserScript==
// @name         Taguj to gówno
// @namespace    tagujto
// @version      1.0.2
// @description  Skrypt ukrywający na Mikroblogu Wykop.pl wpisy, które nie zostały otagowane.
// @author       zranoI
// @include      /^https?:\/\/.*wykop\.pl\/mikroblog.*/
// @grant        none
// ==/UserScript==

$(document).ready(function() {
    $("li.iC > .dC").each(function() {
        if (/#\w+/.exec($(this).find("div.text > p").text()) === null) {
            $(this).parent().hide();
        }
    });
});