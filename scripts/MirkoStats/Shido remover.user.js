// ==UserScript==
// @name         Shido remover 
// @namespace    http://www.wykop.pl/
// @version      0.1
// @description  usuwa komentarze shido (i dyskusję z nim) z wykopaliska/głównej
// @author       You
// @match        http://www.wykop.pl/link/*
// @grant        none
// ==/UserScript==

$(document).ready(function(){
    $("#itemsStream > li > div > div > div.author.ellipsis > a:contains('shido')").closest("li.iC").remove();
});
