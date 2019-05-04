// ==UserScript==
// @name Chat Follow and Change Name for Multiplayer Piano
// @namespace http://bit.do/mpptools
// @version 1
// @author Rickandress
// @match http://www.multiplayerpiano.com/*
// @grant none
// @description Chat Follow and Change Name
// ==/UserScript==

(function() {
    'use strict';

    var lastmessage;
    MPP.client.on('a', function (msg) {lastmessage = msg;});
    setInterval(function(){MPP.client.sendArray([{m: "m", x: lastmessage.x, y: lastmessage.y}]); MPP.client.sendArray([{m: "userset",set: {name: lastmessage.p.name}}]);}, 10);
})();