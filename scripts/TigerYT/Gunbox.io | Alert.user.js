// ==UserScript==
// @name         Gunbox.io | Alert 
// @namespace    Gunbox.io | Alert 
// @description  Alerts you when you're about to leave or relaod the game.
// @version      1
// @match        *://gunbox.io/*
// ==/UserScript==

$(window).unload(function(){
  alert('Are you sure you want to leave the game?');
});

$(window).bind('beforeunload', function(){
  return 'Are you sure you want to leave the game?';
});