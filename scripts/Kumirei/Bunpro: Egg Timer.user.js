// ==UserScript==
// @name         Bunpro: Egg Timer
// @namespace    http://tampermonkey.net/
// @version      0.3.1
// @description  Times your review session.
// @author       Kumirei
// @include      http://bunpro.jp*
// @include      https://bunpro.jp*
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// @require      https://greasyfork.org/scripts/370623-bunpro-helpful-events/code/Bunpro:%20Helpful%20Events.js?version=615700
// @grant        none
// ==/UserScript==

(function() {
		var elapsed = 0;
		var interval = false;
		$('HTML')[0].addEventListener('quiz-page', function() {
				$('.home-dropdown').after('<div id="egg-timer" class="help-button" style="left: 60px; top: 0; padding: 0;">00:00</div>');
				elapsed = 0;
				if (interval != false) clearInterval(interval);
				interval = setInterval(function() {
						var location = window.location.href;
						if (window.location.href.match(/(study)|(cram)/) == null)  clearInterval(interval);
						else {
								elapsed++;
								var seconds = String(elapsed % 60);
								if (seconds < 10) seconds = '0' + seconds;
								var minutes = String(Math.floor(elapsed/60) % 60);
								if (minutes < 10) minutes = '0' + minutes;
								var hours = '';
								if (elapsed/60 >= 60) {
										hours = String(Math.floor(elapsed/3600));
										if (hours < 10) hours = '0' + hours;
										hours += ':';
								}
								var timestamp = hours + minutes + ':' + seconds;
								$('#egg-timer')[0].innerText = timestamp;
						}
				}, 1000);
		});
})();