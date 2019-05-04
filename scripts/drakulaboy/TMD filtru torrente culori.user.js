// ==UserScript==
// @name        TMD filtru torrente culori
// @description coloreaza torrentele care le doresti
// @include     *torrentsmd.*/browse.php*
// @version     1.2
// @author      Drakulaboy
// @icon         http://i.imgur.com/uShqmkR.png
// @require     http://code.jquery.com/jquery-2.1.1.js
// @namespace https://greasyfork.org/users/213
// ==/UserScript==

$(document.getElementsByClassName('.tableTorrents')[0]).ready(function() {
    var exclude = ['Симпсоны', 
                   'Скорпион',
                   'Южный Парк',];
    exclude.forEach(function(i){
        $('.tableTorrents tr:contains(' + i + ')').css("background-color", "#FFF") ;
    });
});