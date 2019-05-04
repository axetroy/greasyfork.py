// ==UserScript==
// @author      Christopher Engel - christopher.engel@outlook.com
// @name        Uncheck Google Two Factor Authorization Trust This Device 
// @namespace   ugssi
// @description Disable google's automatic "Dont ask again on this computer" checkbox when entering Two Factor code
// @include     http://accounts.google.tld/*
// @include     https://accounts.google.tld/*
// @version     1.0
// @grant       none
// ==/UserScript==

var chkbox = document.getElementById('trustDevice');
chkbox.removeAttribute('checked');