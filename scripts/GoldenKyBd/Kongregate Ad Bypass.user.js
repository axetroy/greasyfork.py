// ==UserScript==
// @name        Kongregate Ad Bypass
// @namespace   _GK_GM_KongAdBypass
// @author      GoldenKyBd
// @description Bypasses Kongregate Ads
// @include     http://www.kongregate.com/games/*
// @version     1
// @grant       none
// ==/UserScript==

do {
  console.log("Trying to close Ad.");
  bumper.closeAd(true);
} while(!bumper._closed);