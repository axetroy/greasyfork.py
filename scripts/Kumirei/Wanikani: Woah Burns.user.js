// ==UserScript==
// @name         Wanikani: Woah Burns
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Adds a Kanna Woah emote to your burns count
// @author       Kumirei
// @match        https://www.wanikani.com/dashboard
// @match        https://www.wanikani.com
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// @grant        none
// ==/UserScript==

(function() {
		//Does the thing!
		waitForKeyElements('#burned span', function(e) {
				console.log('WOAH');
				$('#burned').css('height', '104.5px');
				$('#burned').append('<img src="https://cdn.discordapp.com/emojis/295269590219489290.png?v=1" style="position: relative; display: block; height: 40px; bottom: 17px; left: 75%;">');
		});
		//Adapts the page if user has SRS grid installed
		waitForKeyElements('#burned .progressDetailTableTDFirst', function(e) {
				$('#burned').css('height', '139.5px');
				$('#burned img').css({'bottom': '31px', 'left': 'calc(100% - 25px)'});
		});
})();