// ==UserScript==
// @name       YouTube Logo to Subscriptions
// @namespace  https://github.com/mshamory
// @version    0.1
// @description  Makes YouTube logo navigate to subscriptions
// @match      http://www.youtube.com/*
// @match      https://www.youtube.com/*
// @copyright  2014
// ==/UserScript==

document.getElementById("logo-container").href = "/feed/subscriptions";