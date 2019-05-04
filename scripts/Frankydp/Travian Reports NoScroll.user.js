// ==UserScript==
// @name         Travian Reports NoScroll
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Simple script that moves the Mark As Read and the Delete buttons on the reports page to the top of the list.
// @author       FrankP

// @include        http://*.travian.*/berichte.php*
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue

// ==/UserScript==
// Updated 12/1/2015 by FrankP
// ==/UserScript==

/* jshint -W097 */
'use strict';
var buttonSelect = document.getElementById("mark_as_read");
document.getElementById("markAll").appendChild(document.getElementById("mark_as_read"))
document.getElementById("markAll").appendChild(document.getElementById("del"))
