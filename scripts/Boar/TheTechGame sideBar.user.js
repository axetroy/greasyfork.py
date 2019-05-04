// ==UserScript==
// @name        TheTechGame sideBar
// @namespace   Lets you hover over sidebar to open
// @include     *://www.thetechgame.com/* 
// @description Lets you hover over sidebar, quite simple really
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function() {
   $('#sidenav-toggle').mouseenter(function() {
       $('#sidenav').toggle();
       
   });
    
    $('#sidenav').mouseleave(function() {
        $('#sidenav').toggle();
        
    });
    
});