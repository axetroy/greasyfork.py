// ==UserScript==
// @name         Remove Joined and Left messages on Slack
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes the @user joined the #channel and @user left the #Channel messages on slack.
// @author       Jaswant R
// @include      *.slack.com*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     setInterval(function(){ $('.message.joined').hide(); }, 1000);
    // Your code here...
})();