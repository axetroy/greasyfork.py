// ==UserScript==
// @name Disable WeChat Confirmation upon Leaving
// @namespace http://tampermonkey.net/
// @version      0.11
// @description  disable the annoying "Confirm Navigation" notification when trying to refresh or close WeChat web version.
// @author       Mikkkee
// @match        https://web.wechat.com
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    window.onbeforeunload = null;
    window.onunload = null;  
})();
