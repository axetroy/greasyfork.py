// ==UserScript==
// @name        Microsoft MSDN in Inglese
// @namespace   https://msdn.microsoft.com/it-it/
// @namespace   https://docs.microsoft.com/it-it/
// @description Microsoft MSDN from it-IT to en-US
// @include     https://msdn.microsoft.com/it-it/*
// @include     https://docs.microsoft.com/it-it/*
// @version     1
// @grant       none
// @run-at document-start
// ==/UserScript==

var url_old, url_new;

url_old = window.location.href;
url_new = url_old.replace("/it-it", "/en-US");
url_new = url_new.replace("/it-IT", "/en-US");
window.location.replace(url_new);
