// ==UserScript==
// @name         Youtube stream chat remover
// @namespace    https://greasyfork.org/scripts/370453-youtube-stream-chat-remover
// @version      0.2
// @description  Removes chat from a stream page!
// @author       Vladimir Danilov
// @match        https://*.youtube.com/watch*
// @grant        none
// @license      Creative Commons; http://creativecommons.org/licenses/by/4.0/
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js
// ==/UserScript==

const TAG = '[chatRemover]: ';
const chatSelector = 'ytd-live-chat-frame#chat';

(function() {
    'use strict';
    console.log(TAG + "Script loaded");
    $(function() {
        console.log(TAG + "Script started");
        tryToRemoveChat(10, 1000);
    });

})();

function tryToRemoveChat(times, interval) {
    if(times <= 0)
        return;
    console.log(TAG + "Looking for chat");
    var chat = $(chatSelector);
    if(chat[0]) {
        console.log(TAG + "Chat found");
        console.log(chat);
        chat.remove();
        console.log(TAG + "Chat removed");
    } else {
        console.log(TAG + "No chat found");
        window.setTimeout(function() {
            tryToRemoveChat(times - 1);
        }, interval);
    }
}
