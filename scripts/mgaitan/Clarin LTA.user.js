// ==UserScript==
// @name        Clarin LTA
// @namespace   clarin
// @include     http://www.clarin.com/*
// @version     1
// @description:es  Saltear la ventana de login en clarin.com
// @description:en  Skip the login-wall at clarin.com
// @grant       none
// @description Saltear la ventana de login en clarin.com
// ==/UserScript==

$('#cboxOverlay').remove();
setTimeout(function(){ $('iframe.cboxIframe').remove(); }, 1500);
