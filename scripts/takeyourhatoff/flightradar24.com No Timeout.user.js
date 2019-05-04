// ==UserScript==
// @name        flightradar24.com No Timeout
// @namespace   https://greasyfork.org/users/58/flightradar24notimeout
// @description Stops flightradar24.com disabling your session after 30 mins
// @include     http://www.flightradar24.com/*
// @version     1
// @grant       none
// ==/UserScript==
clearTimeout(idleTimeout);