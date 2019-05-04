// ==UserScript==
// @name        JavaCodeGeeks.com-ClosePopup
// @namespace   https://github.com/VenkataRaju/GreaseMonkeyScripts/JavaCodeGeeks.com-ClosePopup
// @description Closes Popup from JavaCodeGeeks.com and WebCodeGeeks.com
// @match       http://javacodegeeks.com/*
// @match       http://*.javacodegeeks.com/*
// @match       http://webcodegeeks.com/*
// @match       http://*.webcodegeeks.com/*
// @run-at      document-end
// @noframes
// @version     1.03
// @grant       none
// ==/UserScript==


/** Version History
    1.02  : 1. Actually (:)) updated description (Added WebCodeGeeks.com)
		1.03  : Updated for new popup
*/

(function closePopup(attemptNum)
{
  var overlay = document.querySelector("div.fancybox-overlay");
  var popupDiv = document.querySelector("div.fancybox-wrap");
  if (overlay !== null && popupDiv !== null)
  {
    overlay.remove();
    popupDiv.remove();
  }
  else if(attemptNum < 17)
    setTimeout(function() closePopup(attemptNum + 1), 600);
})(0);
