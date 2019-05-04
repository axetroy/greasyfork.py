// ==UserScript==
// @name         Chat color changer
// @namespace    Chat color changer
// @version      1.0
// @description  Changes mods chat color to black
// @author       Scruffy120/breakmyballs
// @match        *www.diamondhunt.co/game.php
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant        gm_addStyle
// ==/UserScript==


//To change the actual color of the chat change "black" to some other color!
window.setInterval(function(){
 $("span[style='color:#669999;']").css("color","black");
}, 1000);