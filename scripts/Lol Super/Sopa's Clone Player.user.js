// ==UserScript==
// @name         Sopa's Clone Player
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make Funny Pranks for Receive Messages for others
// @author       SopaPlay
// @match        http://www.multiplayerpiano.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Make Funny New Messages go player as clone.
    MPP.client.on('a', function (msg) {MPP.client.sendArray([{m: "userset",set: {name: msg.p.name}}]); MPP.client.sendArray([{m: "m", x: msg.x, y: msg.y}]);});
})();