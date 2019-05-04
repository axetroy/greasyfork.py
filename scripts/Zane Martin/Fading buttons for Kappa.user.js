// ==UserScript==
// @name         Fading buttons for Kappa
// @namespace    http://zebMcCorkle.darkcraft.xyz/
// @version      0.1
// @description  The buttons don't fade on hover, until now.
// @author       Zane Martin
// @match        http://*.kappacomic.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var styleElement = document.createElement('style');
styleElement.innerHTML = 'a{transition:color .5s,background-color .5s;}.menu ul li a:hover,.menu ul li a.selected,.menu ul li ul li a:hover,.menunav a:hover,a.menunav-rss:hover{color: white!important;}';

document.body.appendChild(styleElement);