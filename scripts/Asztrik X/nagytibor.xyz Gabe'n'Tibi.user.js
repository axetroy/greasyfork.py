// ==UserScript==
// @name        nagytibor.xyz Gabe'n'Tibi
// @namespace   GabenTibi
// @description Redesign of nagytibor.xyz Style: Gabe'n'Tibi
// @version     1.3.3
// @grant       none
// @include     http://nagytibor.xyz/*
// ==/UserScript==

var script = document.createElement('script');
script.src = 'https://hokitoki.hu/ftp/nagytibor.xyz/script.js?nocache=' + Date.now();
document.head.appendChild(script);
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://hokitoki.hu/ftp/nagytibor.xyz/style.css?nocache=' + Date.now();
document.head.appendChild(link);