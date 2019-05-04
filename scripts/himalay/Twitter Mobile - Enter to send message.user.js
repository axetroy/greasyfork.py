// ==UserScript==
// @name        Twitter Mobile - Enter to send message
// @version      0.3
// @description  This script allows user to send message by pressing the enter key on Twitter Mobile DM
// @author       himalay
// @namespace    https://himalay.com.np
// @include     *://mobile.twitter.com/messages/*
// @run-at document-end
// ==/UserScript==

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      document.querySelector('[data-testid="dmComposerSendButton"]').click();
      e.preventDefault();
    }
}, false);