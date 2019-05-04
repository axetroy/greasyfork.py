// ==UserScript==
// @name        WD Cloud Unhide Button
// @description Unhides the "shutdown" button for the WD Cloud.
// @namespace   Pogmog
// @include     http://192.168.1.07/*
// @version     1
// @grant       none
// ==/UserScript==


window.setInterval(function(){
  $('#id_shutdown_td').css({
    'display': 'initial'
  });
}, 5000);