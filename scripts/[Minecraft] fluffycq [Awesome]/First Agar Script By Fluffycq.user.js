// ==UserScript==
// @name         First Agar Script By Fluffycq
// @namespace    http://github.com/fluffycq/
// @version      0.1
// @description  mlg first script
// @author       Fluffycq
// @match        http://agar.io/*
// @require      http://cdn.jsdelivr.net/msgpack/1.05/msgpack.js
// @grant        none
// @run-at       document-body
// ==/UserScript==

window.msgpack = this.msgpack;

(function() {
    var _WebSocket = window._WebSocket = window.WebSocket;
    var $ = window.jQuery;
    var msgpack = window.msgpack;
    var options = {
        enableMultiCells: true,
        enablePosition: true,
        enableAxes: false,
        enableCross: true
    };

    // game states
    var agar_server = null;
    var map_server = null;
    var player_name = [Gecko];