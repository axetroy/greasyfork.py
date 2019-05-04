// ==UserScript==
// @name        Always desktop Twitter
// @description Redirect mobile Twitter to desktop
// @version     1.0
// @author      TiLied
// @namespace   https://greasyfork.org/users/102866
// @include     *://mobile.twitter.com/*
// @run-at      document-start
// @grant       none
// ==/UserScript==

location.href = location.href.replace("mobile.twitter.com/", "twitter.com/");
