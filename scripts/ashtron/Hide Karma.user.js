// ==UserScript==
// @name        Hide Karma
// @namespace   https://www.reddit.com
// @description Hides karma scores on Reddit links and comments
// @include     https://www.reddit.com/*
// @version     1
// @grant       none
// ==/UserScript==

$(".score").css("display", "none");
$("span:contains('[score hidden]')").css("display", "none");