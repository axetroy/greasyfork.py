// ==UserScript==
// @name         Wykop Moje Zgłoszenia
// @namespace    http://mirkuj.pw/
// @version      0.4
// @description  Dodatkowy przycisk ułatwiający zobaczenie swoich zgłoszeń 
// @author       KaszaGryczana
// @match        http://*.wykop.pl/*
// @namespace    https://greasyfork.org/pl/users/45403-micha%C5%82-m
// @grant        none
// ==/UserScript==
(function() {
$(document).ready(function() {
$(".clearfix").find(".dropdown").find("li").eq(3).prepend( "<li><a href='/naruszenia/moje/' title='Zgłoszenia'><i class='fa fa-flag'></i><span> zgłoszenia</span></a></li>" );
});
})();