// ==UserScript==
// @name        iRacingKeepAlive
// @namespace   bargmann.iracing
// @match	http://members.iracing.com/membersite/member/*
// @version     2
// @grant       none
// @description Prevents iRacing's new "Still Here..." thingie, and keeps the site going...
// ==/UserScript==

function keepAlive() {
  
  location.href = "javascript:void(HammerTime.canRefresh(true));";
  
}

setInterval(keepAlive, 300000);
