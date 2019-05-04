// ==UserScript==
// @name         Wanikani: Move context sentence to top
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Moves the context sentence to the top when you open the full info of a vocabulary item.
// @author       Kumirei
// @match        https://www.wanikani.com/review/session
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js
// @grant        none
// ==/UserScript==

(function() {
		waitForKeyElements('#item-info-context-sentences', function(e) {
				$('#item-info-col2').prepend(e);
		});
})();