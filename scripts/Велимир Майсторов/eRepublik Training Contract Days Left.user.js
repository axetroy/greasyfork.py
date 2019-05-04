// ==UserScript==
// @name		eRepublik Training Contract Days Left
// @description    Shows how many days left for Training Contract
// @author         Velimir Majstorov
// @screenshot https://i.imgur.com/R3i9Bue.png
// @screenshot https://i.imgur.com/R3i9Bue.png
// @version		1.12
// @include		https://www.erepublik.com/*
// @grant		none
// @run-at		document-end
// @noframes
// @namespace https://greasyfork.org/users/157711
// ==/UserScript==
//And the fun begins...
function waitUntil(n,t,i,e,o){void 0===e&&(e=300),void 0===o&&(o=20),n()?t():setTimeout(function(){e?waitUntil(n,t,i,e-1,o):void 0!==i&&i()},o)}"training-grounds"==location.href.split("/")[5]&&waitUntil(function(){return document.getElementsByClassName('countdown_row countdown_amount')[0]},function(){var n=document.getElementsByClassName('countdown_row countdown_amount')[0],t=" "+Math.floor(parseInt(n.innerText)/24)+" day(s) left";document.getElementsByTagName("small")[5].innerHTML+=t},function(){console.log("I'm bored. I give up.")});