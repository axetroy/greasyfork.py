// ==UserScript==
// @name        Pretty Ad Remover for TF2C
// @namespace   deetr
// @description Removes ads for TF2C without leaving big boxes
// @include     /^https?:\/\/(www)?tf2center.com\/lobbies.*$/
// @version     1.1
// @grant       none
// ==/UserScript==

$('._containerHor').text("").hide();
$('._containerVer').text("").hide();
$('#google_image_div').text("").hide();