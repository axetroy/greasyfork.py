// ==UserScript==
// @name         NBK.io Skin Rotator
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  A NBK.io Skin Rotater, Dosen't Work In Beta.
// @author       Ghost
// @author       Wolf
// @match        http://nbk.io/*
// @grant        none
// ==/UserScript==

var css = 'https://dl.dropbox.com/s/75efd07kjas6m0p/skinrotator.css';
var js = 'https://dl.dropbox.com/s/759dhhgv4njm3rl/skinrotator.js';

var dhg = document.createElement('style');
dhg.id = 'imgHeight';

var dlk = document.createElement('link');
dlk.rel = 'stylesheet';
dlk.href = css;

var dsc = document.createElement("script");
dsc.type = "text/javascript";
dsc.src = js;

$("script:last").after(dlk);
$("head").append(dhg);
$("script:last").after(dsc);