// ==UserScript==
// @name         253874_video_style
// @namespace    http://tampermonkey.net/253874_video_style
// @version      0.2
// @description  make 253874 video tag not too large.
// @author       You
// @match        https://www.253874.net/t/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(`
video{
max-height:90vh;
width:auto;
}
`);
})();