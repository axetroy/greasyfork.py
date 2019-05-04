// ==UserScript==
// @name WYKOP.PL CZARNOLISTO KILLER
// @description MINUSUJ AKTOMATYCZNIE OSOBY NA CZARNEJ LIŚCIE.
// @author Kacper Pawlak
// @version 1.0
// @include http*://*.wykop.pl/*
// @grant szok
// @namespace https://greasyfork.org/users/9304
// ==/UserScript==
setTimeout(function(){ javascript:$('.comments-stream .more:not(.dnone)').parent().find('.fa-minus').parent() .click(); }, 2000);
