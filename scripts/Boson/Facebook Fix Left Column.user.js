// ==UserScript==
// @name         Facebook Fix Left Column
// @namespace    undefined
// @version      0.1
// @description  Freeze the left hand column of the newsfeed in position
// @author       JamesBoson
// @match        http//*.facebook.com/*
// @match        https://*.facebook.com/*
// @grant        none
// @run-at       document-end
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==


window.onload = function(){
    'use strict';
    var att = document.createAttribute("style");
    att.value = "position: fixed;";
    var leftCol = document.getElementById('leftCol');
    document.getElementById('leftCol').setAttributeNode(att);
};
