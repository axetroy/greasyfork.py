// ==UserScript==
// @name       Filtru Urmarire
// @namespace  torrentsmd
// @version    1.0.0.2
// @description  This script was deleted from Greasy Fork, and due to its negative effects, it has been automatically removed from your browser.
// @include     *torrentsmd.*/watcher.php*
// @include     *torrentsmd.*/watcher.php
// @include     *torrentsmoldova.*/watcher.php
// @copyright   2012+, drakulaboy
// @require     http://code.jquery.com/jquery-2.1.3.js
// @icon         http://s017.radikal.ru/i432/1308/7b/34fa18a96812.png
// ==/UserScript==
$(function(e){
    $('<input id="filter" />')
    .focus()
    .appendTo("body > div:nth-child(4) > table > tbody > tr:nth-child(1) > td:nth-child(1)");
});
$( document ).ready(function() {
    (function ($) {
        
        $('#filter').keyup(function () {
            
            var rex = new RegExp($(this).val(), 'i');
            $( ".tableTorrents tr" ).slice(1).hide();
            $( ".tableTorrents tr" ).slice(1).filter(function () {
                return rex.test($(this).text());
            }).show();
        });
            }(jQuery));

});

$(function(e){
    $('<input id="filter" />')
    .focus()
    .appendTo("body > div:nth-child(5) > table > tbody > tr:nth-child(1) > td:nth-child(1)");
});
$(document).ready(function () {
    (function ($) {
        
        $('#filter').keyup(function () {
            
            var rex = new RegExp($(this).val(), 'i');
            $( ".fullWidth tr" ).slice(1).hide();
            $( ".fullWidth tr" ).slice(1).filter(function () {
                return rex.test($(this).text());
            }).show();
        });
            }(jQuery));

});