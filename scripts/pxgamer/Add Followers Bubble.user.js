// ==UserScript==
// @name        Add Followers Bubble
// @namespace   PXgamer
// @include     *kickass.to/user/*/followers/
// @include     *kat.cr/user/*/followers/
// @version     1.2
// @description Adds Follower Bubble
// @grant       none
// ==/UserScript==

$('.selectedTab span').append(' <i class="menuValue">'+$('h2').html().split(' ')[0]+'</i>');