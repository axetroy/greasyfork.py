// ==UserScript==
// @name         Filter gamesdonequick (AGDQ, SGDQ) twitch chat.
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Removes emotes only, UPPERCASE ONLY and user notices.
// @author       ciscoheat
// @match        https://www.twitch.tv/gamesdonequick*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function() {
        var messages = document.querySelectorAll('.chat-line__message');
        [].forEach.call(messages, function(message) {
            var node = message.querySelector('span[data-a-target="chat-message-text"]');
            var msg = node ? node.innerText : null;
            //console.log(msg);
            if(!node || (msg.toUpperCase() == msg ||
                       msg.toUpperCase() == "HAHAA" ||
                       msg.match(/^([A-Z][a-z]+)+$/) !== null)
            ) {
                message.style.display = "none";
            }
       });

        var notices = document.querySelectorAll('.user-notice-line');
        [].forEach.call(notices, function(notice) {
            notice.style.display = "none";
        });
     }, 1);
})();