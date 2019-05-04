// ==UserScript==
// @name         Filter twitch chat
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Filter chat at twitch.tv script, it removes messages with single word
// @author       iiw
// @match        https://www.twitch.tv/*
// @grant        none
// @require https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

(function() {
    'use strict';

    // uncomment this if you want hide overlay player controls
    // setTimeout(() => $(".hover-display").remove(), 5000);

    setInterval(function() {
        $(".chat-line__message").each(function(_, msg) {
            var splitted = msg.innerText.split(" ");
            if (splitted.length > 0 && splitted.length < 3) {
                $(msg).css("display", "none");
            }
        });
    }, 2);
})();