// ==UserScript==
// @name        HideGalaxyButton
// @namespace   GogExtensions
// @description Hides Galaxy button in library
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @include     https://www.gog.com/account
// @include     http://www.gog.com/
// @version     4
// @grant       none
// ==/UserScript==
$(".btn--galaxy,.galaxy-banner").hide();