// ==UserScript==
// @name           Zippyshare Auto Download 0.4 (March 2019)
// @namespace      Zippyshare Auto Download
// @grant none
// @description    Automatically starts downloads hosted by Zippyshare
// @include        http*://www*.zippyshare.com/*
// @version 0.4.2019-03-10-2
// ==/UserScript==
document.getElementById('dlbutton').click();
setTimeout("window.close();", 3000);