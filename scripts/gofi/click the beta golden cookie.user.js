// ==UserScript==
// @name         click the beta golden cookie
// @namespace    http://tampermonkey.net/
// @version      1
// @description  great beta cookie empire
// @author       gofi
// @match        http://orteil.dashnet.org/cookieclicker/beta/
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

var clickgoldencookies = setInterval(function() {
    $('#goldenCookie').trigger('click');
}, 1);