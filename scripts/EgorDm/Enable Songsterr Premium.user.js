// ==UserScript==
// @name         Enable Songsterr Premium
// @version      0.1
// @description  Enable songsterr premium
// @author       EgorDm
// @grant        none
// @include *songsterr.com*
// @include songsterr.com*
// @include *songsterr.com
// @include songsterr.com
// @include www.songsterr.com*
// @include http://songsterr.com/*
// @include http://*.songsterr.com/*
// @namespace https://greasyfork.org/users/166286
// ==/UserScript==

(function() {
    'use strict';
    /* jshint asi: true, esnext: true, -W097 */
    // Find all the objects that have user property and set hasPlus key in user to true. Simple as that
    Object.values(window).filter((el) => el instanceof Object && el.hasOwnProperty('user')).map((el) => el.user.hasPlus=true);
})();