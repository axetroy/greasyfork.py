// ==UserScript==
// @name         click the wall
// @namespace    http://tampermonkey.net/
// @version      1
// @description  try to take over the world!
// @author       Khdoop
// @match        http://orteil.dashnet.org/experiments/idlegamemaker/?game=hczBgm6k
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

var testo = setInterval(function() {
    $('#clickable-hitwall').trigger('click');
}, 1);