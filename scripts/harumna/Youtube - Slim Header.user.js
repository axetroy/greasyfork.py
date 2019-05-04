// ==UserScript==
// @name        Youtube - Slim Header
// @namespace   Youtube - Slim Header
// @include     https://www.youtube.com*
// @author      harumna
// @description Reduces YT header (searchbar, ...) height. For new 2017 YT design.
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("#container.ytd-masthead {height: 36px !important;}")
GM_addStyle("#page-manager {margin-top: 36px !important;}")