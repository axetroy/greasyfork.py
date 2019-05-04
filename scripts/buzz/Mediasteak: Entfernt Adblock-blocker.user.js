// ==UserScript==
// @name           Mediasteak: Entfernt Adblock-blocker
// @namespace      https://greasyfork.org/en/users/8981-buzz
// @description    Entfernt den AdBlock-Blocker von www.mediasteak.com.
// @author         buzz
// @version        0.3
// @license        GPLv2
// @match          http*://www.mediasteak.com/*
// @grant          none
// @noframes
// ==/UserScript==
/* jshint -W097 */
'use strict';

var h, s;
h = document.getElementsByTagName('head')[0];
s = document.createElement('style');
s.type = 'text/css';
s.innerHTML = '#vice-adblock, #steady-adblock-overlay-container { display: none !important; }';
h.appendChild(s);
