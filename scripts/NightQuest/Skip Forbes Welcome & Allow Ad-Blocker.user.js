// ==UserScript==
// @name        Skip Forbes Welcome & Allow Ad-Blocker
// @author      NightQuest
// @namespace   recelate.net
// @description Skips Forbes welcome screen, and allows use of an Ad-Blocker.
// @include     http://www.forbes.com/forbes/welcome/
// @include     https://www.forbes.com/forbes/welcome/
// @version     1.0
// @grant       none
// ==/UserScript==

// Is it seriously this easy? haha
WelcomeAd.Views.Ads = function(){}

// Redirect
window.location = JSON.parse(Cookies.get("forbesUtilCookie").replace(new RegExp(/'/g), '"')).toURL;
