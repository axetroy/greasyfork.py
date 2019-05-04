// ==UserScript==
// @name        Updated Ad Remover for TF2C
// @namespace   tf2cadblockremover
// @description Removes ads for TF2C without leaving big boxes
// @include     /^https?:\/\/(www)?tf2center.com\/.*$/
// @version     0.3
// @grant       none
// ==/UserScript==

$('._containerHor').text("").hide();
$('._containerVer').text("").hide();
$('._containerVerRight').text("").hide();
$('#google_image_div').text("").hide();
noAds=true;