// ==UserScript==
// @name        Uncheck Google Stay Signed In
// @namespace   ugssi
// @description Disable google's automatic sign-in, yes, as simple as that
// @include     http://accounts.google.tld/*
// @include     https://accounts.google.tld/*
// @version     1.0
// @grant       none
// ==/UserScript==
var chkbox = document.getElementById('PersistentCookie');
chkbox.removeAttribute('checked');
