// ==UserScript==
// @name           EasyNav
// @namespace      EasyNav
// @description    Enable Next and Prev Chapter by Pressing Right and Left Arrow key.
// @author         An0N @ novelupdates.com
// @copyright      http://forum.novelupdates.com/members/an0n.1828/
// @version        1.31
// @icon           https://lh3.googleusercontent.com/-4QLkHOG36Kg/V4tpMr0smAI/AAAAAAAADg0/E11MxOtFmzEfqCDjk8_L6pMQ17_01HWSACCo/s800/left-and-right-arrow-icon-29.png
// @include        http://www.wuxiaworld.com/*
// @include        https://www.wuxiaworld.com/*
// @include        http://scrya.org/*
// @include        https://scrya.org/*
// @include        http://royalroadl.com/fiction/*
// @include        https://royalroadl.com/fiction/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant          none
// @run-at         document-end
// ==/UserScript==
(function() {
  var PrevLink = $("a:contains('Previous Chapter')");
  var NextLink = $("a:contains('Next Chapter')");

  document.addEventListener('keydown', function(e) {
    // pressed Right Arrow
    if (e.keyCode == 39 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      window.location = NextLink[0].href;
    }
    // pressed Left Arrow
    if (e.keyCode == 37 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      window.location = PrevLink[0].href;
    }
  }, false);
})();