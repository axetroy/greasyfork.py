// ==UserScript==
// @author       tm1
// @name         Youtube - Uncheck Autoplay checkbox (toggleButton)
// @version      1.0.0
// @description  Uncheck Autoplay checkbox at Youtube
// @match        https://www.youtube.com/*
// @license      GPL-2.0-or-later; http://www.gnu.org/licenses/gpl-2.0.txt
// @run-at       document-start
// @grant        none
// @noframes
// @namespace https://greasyfork.org/users/103208
// ==/UserScript==

var chkbox = document.getElementById('toggleButton');
chkbox.removeAttribute('checked');