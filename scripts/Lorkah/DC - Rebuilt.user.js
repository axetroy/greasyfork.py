// ==UserScript==
// @name        DC - Rebuilt
// @namespace   InGame
// @include     https://www.dreadcast.net/Main
// @version     0.1
// @grant       none
// @author      Lorkah
// @description Change l'apparence du secteur 1 pour un peu plus de vie
// ==/UserScript==


window.setInterval(function(){

   if($('#carte_fond').css('background-image')==("url(\"https://www.dreadcast.net/images/carte/carte_rues_s1.png\")")){
   $('#carte_fond').css('background-image',"url(\"https://i.imgur.com/S6QxN9c.png\")")};

}, 500 );