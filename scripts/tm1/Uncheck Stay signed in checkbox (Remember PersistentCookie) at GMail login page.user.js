// ==UserScript==
// @author      tm1
// @name        Uncheck Stay signed in checkbox (Remember PersistentCookie) at GMail login page
// @namespace   nothing
// @description Disable google's automatic "Stay signed in" checkbox at GMail login page
// @include     http://accounts.google.tld/*
// @include     http://accounts.google.com/*
// @include     https://accounts.google.tld/*
// @include     https://accounts.google.com/*
// @version     1.0.1
// @grant       none
// ==/UserScript==

var chkbox = document.getElementById('PersistentCookie');
chkbox.removeAttribute('checked');