// ==UserScript==
// @name        Mobile Twitter
// @name:fr     Mobile Twitter
// @description Redirect desktop Twitter to mobile
// @description:fr Redirige Twitter Desktop vers la version mobile
// @version     1.0
// @author      ornicarz, TiLied
// @namespace   https://greasyfork.org/fr/users/175793
// @include     *://twitter.com/*
// @run-at      document-start
// @grant       none
// ==/UserScript==

location.href = location.href.replace("twitter.com/", "mobile.twitter.com/");
