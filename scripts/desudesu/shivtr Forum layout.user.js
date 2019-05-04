// ==UserScript==
// @name shivtr Forum layout
// @description Useful if the layout has three columns and the forum posts are too narrow 
// @namespace Violentmonkey Scripts
// @version 0.02
// @match https://*.shivtr.com/forum*
// @grant GM_addStyle
// ==/UserScript==
GM_addStyle (" #right_column, #left_column, .side_box, .header, #admanager { display: none; } #middle_column { width: 1000px; } .entry { font-size: 16px; } ");
