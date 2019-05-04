// ==UserScript==
// @name         Hide Twitter Notifications
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide Retweet and Reply Notification Count
// @author       Sarah Eaglesfield
// @match        https://twitter.com/*
// @grant        GM_addStyle
// ==/UserScript==

document.getElementsByClassName("count")[0] .style.visibility="hidden";