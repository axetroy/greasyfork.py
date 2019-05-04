// ==UserScript==
// @name       Redirect Nexus
// @version    0.3
// @description Simple script that redirects to the nexus site redesign
// @include    https://www.nexusmods.com/*
// @run-at     document-start
// @namespace https://greasyfork.org/users/155269
// ==/UserScript==

var changeURL = window.location.href;
location.href = changeURL.replace('https://www.','https://rd.');