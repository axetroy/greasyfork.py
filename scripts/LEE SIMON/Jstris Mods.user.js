// ==UserScript==
// @name         Jstris Mods
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.jstris.jezevec10.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function(){
        //Jstris Custom Background Image
        document.head.getElementsByTagName("style")[0].innerHTML="";
        document.body.style.backgroundImage="url('https://media.discordapp.net/attachments/350933033647603712/447487790918402068/unknown.png?width=882&height=497')";
        document.body.style.backgroundSize="100%";
        document.getElementById("app").style.backgroundColor="rgba(0, 0, 0, 0.8)";
        document.getElementById("app").style.height="1000px";

        //Jstris Block Skin Change
       loadSkin("https://i.imgur.com/G6WbXoD.png",32);
loadGhostSkin("https://media.discordapp.net/attachments/429007833992790036/563712557504921621/tf_default_ghost.png",36);
    });
})();