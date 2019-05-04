// ==UserScript==
// @name       	 F365 Forum Fix
// @version      1.01
// @description  Sorts the caching issue
// @include      http://forum.football365.com/*
// @include      http://forum.football365.com/viewforum.php?f=4
// @include      http://forum.football365.com/viewforum.php?f=5
// @exclude      http://forum.football365.com/index.php
// @exclude      http://forum.football365.com/ucp.php*
// @run-at document-start
// @namespace https://greasyfork.org/users/221979
// ==/UserScript==


const { href } = window.location;
if (!/&\d+$/.test(href)) {
  
window.location.replace(href + '&' + String(Math.random()).slice(2));
}
