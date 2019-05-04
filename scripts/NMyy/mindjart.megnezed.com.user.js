// ==UserScript==
// @name         mindjart.megnezed.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       NMyy
// @match        *://mindjart.megnezed.com/*
// @grant        none
// ==/UserScript==

$(document).ready(function() {
    var searchableStr   = document.URL + '&';
    var link  = searchableStr.match (/[\?\&]l=([^\&\#]+)[\&\#]/i) [1];
    link=decodeURIComponent(link);
    location.href=atob(link);
});