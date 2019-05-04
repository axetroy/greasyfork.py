// ==UserScript==
// @name        IPT BannerFix
// @description IPT BannerFix - Fixes the ridiculously large IPT Banner Section to a reasonable size.
// @include     *iptorrents.com/*
// @version     1
// @grant       none
// @namespace https://greasyfork.org/users/64132
// ==/UserScript==


//CLEANUP
//Slim Down the Banner
document.querySelector('.bannerPlaceholder').remove();
document.querySelector('#iptStart .banner').style = 'background-color: black; height: 65px';

