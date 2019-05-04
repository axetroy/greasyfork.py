// ==UserScript==
// @name        Disable HWZ forums background ad
// @namespace   hwz
// @description Stops the irritating background ad on the HardwareZone Forums from being clickable. You'll still see it, but you won't accidentally click on the ad any more.
// @include     http://forums.hardwarezone.com.sg/*
// @version     1.0
// @grant       none
// ==/UserScript==

document.body.onclick = null;