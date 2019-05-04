// ==UserScript==
// @name         click the brick
// @namespace    http://tampermonkey.net/
// @version      1
// @description  great bricks empire
// @author       gofi
// @match        http://orteil.dashnet.org/experiments/idlegamemaker/?game=hczBgm6k
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

var shitbrix = setInterval(function() {
    $('#clickable-makebricks').trigger('click');
}, 1);