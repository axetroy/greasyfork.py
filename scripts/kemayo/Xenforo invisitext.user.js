// ==UserScript==
// @name         Xenforo invisitext
// @namespace    http://davidlynch.org/
// @version      0.1
// @description  Make some invisible text a little more visible
// @author       David Lynch
// @match        https://forums.sufficientvelocity.com/*
// @match        https://forums.spacebattles.com/*
// @match        https://forums.questionablequesting.com/*
// @match        https://xenforo.com/community/*
// @grant        GM_addStyle
// ==/UserScript==
/* jshint -W097 */
'use strict';

GM_addStyle('span[style*="Transparent"], span[style*="transparent"], span[style*="TRANSPARENT"] { text-decoration: underline dotted; text-decoration-color: inherit; background: #000000; }');
GM_addStyle('span[style*="Transparent"]:hover, span[style*="transparent"]:hover, span[style*="TRANSPARENT"]:hover { color: #99CC00 !important; }');