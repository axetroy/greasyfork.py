// ==UserScript==
// @name         Discord Blocked Message Blocker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  This really blocks blocked users (removes the "n blocked messages" message)
// @author       Mega Mewthree
// @match        https://discordapp.com/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

(function(){
    var i = setInterval(function(){
        $('.message-group-blocked').css('display', 'none');
        if ($('.message-group-blocked').css == 'none'){
            clearInterval(i);
        }
    }, 10);
})();