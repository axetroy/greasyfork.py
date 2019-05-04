// ==UserScript==
// @name         Animeflv iframe autoplay
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://s3.animeflv.com/embed.php?*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    
    //console.log("======== Animeflv iframe autoplay start ! =======");

    var autostart = function() {
        setTimeout(function() {
            var player = jwplayer();
            var state = player.getState();
            player.play(true);
            //console.log("player state: " + state);
            if(state != "playing"){
                autostart();
            }
        }, 100);
    };
    
    autostart();
    
})();