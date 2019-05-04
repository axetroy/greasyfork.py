// ==UserScript==
// @name        Add view port mobile meta to all pages  
// @namespace   english
// @description Add view port mobile meta to all pages (mobile enable) - Install on FF Mobile
// @include     http*://*
// @version     1.1
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==

var meta = document.createElement('meta');
meta.httpEquiv = "X-UA-Compatible";
meta.name = 'viewport';
meta.content= 'width=device-width, initial-scale=1'; 

document.getElementsByTagName('head')[0].appendChild(meta);
