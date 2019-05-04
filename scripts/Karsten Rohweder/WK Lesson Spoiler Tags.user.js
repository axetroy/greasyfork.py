// ==UserScript==
// @name         WK Lesson Spoiler Tags
// @namespace    ktx_wk_lesson
// @version      0.3
// @description  Makes example sentence translations visible on mouseover
// @author       Karsten Rohweder
// @match        https://www.wanikani.com/*
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';
    GM_addStyle('.context-sentence-group>p:nth-child(2) { color: transparent; text-shadow: 0 0 15px #aaa; } .context-sentence-group>p:nth-child(2):hover { color: black; text-shadow: none }');

})();
