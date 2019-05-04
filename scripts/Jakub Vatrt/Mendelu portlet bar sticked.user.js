// ==UserScript==
// @name         Mendelu portlet bar sticked
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  stick left portletbar when scrolling
// @author       Jakub
// @match        https://is.mendelu.cz/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

$(function(){
$(".portletbar").css("position", "fixed");
});

