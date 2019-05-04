// ==UserScript==
// @name        Tagesanzeiger Paywall Remover
// @namespace   http://www.tagesanzeiger.ch
// @version     0.6
// @description The userscript removes the "paywall" DIV overlay_wrap after 1.5sec on tagesanzeiger.ch also unset position of HTML for full view.
// @match       *://www.tagesanzeiger.ch/*
// @copyright   2017 @honsa based on Script from Vinz666 released in 2014+
// ==/UserScript==

setTimeout("document.getElementById('overlay_wrap').style.display = 'none';", 1500);
setTimeout("document.getElementsByTagName('html')[0].style.position = 'unset';", 1510);
setTimeout("document.getElementsByTagName('body')[0].style.position = 'unset';", 1520);
setTimeout("$(document).scroll(function(event){window.onbeforeunload = function(){return 'Auf dieser Seite bleiben?';};});", 1525);
setTimeout("$(document).click(function(event){window.onbeforeunload = function(){}});", 1525);