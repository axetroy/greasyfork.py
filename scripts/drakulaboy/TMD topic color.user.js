// ==UserScript==
// @name        TMD topic color
// @description coloreaza topicurile care le doresti
// @include     *torrentsmd.*/watcher.php
// @version     1.0
// @author      Drakulaboy
// @icon         http://s017.radikal.ru/i432/1308/7b/34fa18a96812.png
// @require     http://code.jquery.com/jquery-1.10.2.js
// @namespace https://greasyfork.org/users/213
// ==/UserScript==

$(document).ready(function () {
    var exclude = ['TOP ACHTUNG', 
                   'Dexter',
                  'Suits',
                  'Lightroom',
                  'Breaking Bad',
                  'Supernatural',
                  'Sherlock',];
    
    exclude.forEach(function(i){
        $('tbody tr:contains(' + i + ')').css("background-color", "#15d65c") ;
    });
});