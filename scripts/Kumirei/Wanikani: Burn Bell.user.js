// ==UserScript==
// @name         Wanikani: Burn Bell
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Plays a bell sound when you burn an item
// @author       Kumirei
// @match        https://www.wanikani.com/review/session
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// @license      MIT; http://opensource.org/licenses/MIT
// @grant        none
// ==/UserScript==

(function() {
		var audio = new Audio("https://my.mixtape.moe/ihdrkm.mp3")
		waitForKeyElements('.srs-burn', function() {
				audio.play();
		});
})();