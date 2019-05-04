// ==UserScript==
// @name        layerd_disabled
// @namespace   shjanken
// @include     http://blog.csdn.net/fengbingchun/article/details/51872436
// @version     1
// @grant       none
// @description:en display the ad
// ==/UserScript==

var layerd = document.getElementById('layerd');
if (layerd)
  layerd.style.visibility = 'hidden'