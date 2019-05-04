// ==UserScript==
// @name         Agar.io Skin Rotator
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  Skin Rotator, probably have errors.
// @author       MiyakeDev
// @author       master2500
// @match        http://alis.io/*
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