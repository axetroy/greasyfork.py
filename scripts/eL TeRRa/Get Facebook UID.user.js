// visit some profile on fb, then open console then type and press enter: get_id
// ==UserScript==
// @name         Get Facebook UID
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/*
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    Object.defineProperty(unsafeWindow, 'fbid', {
        get: function () {
            return JSON.parse(document.getElementById("pagelet_timeline_main_column").getAttribute("data-gt")).profile_owner;
        }
    });
})();