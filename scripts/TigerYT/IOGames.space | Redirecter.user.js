// ==UserScript==
// @name         IOGames.space | Redirecter
// @version      1.1
// @description  Redirects you to the original game when you play a game on IOGames.space
// @author       TigerYT
// @match        http://iogames.space/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// @namespace    https://greasyfork.org/users/137913
// ==/UserScript==

$(".field-item > iframe").addClass('gameframe');
var link = $(".gameframe").attr('src');
if($('.gameframe').is(':visible')){
  window.location.replace(link);
};