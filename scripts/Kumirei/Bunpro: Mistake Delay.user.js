// ==UserScript==
// @name         Bunpro: Mistake Delay
// @namespace    http://tampermonkey.net/
// @version      0.2.4
// @description  Prevents premature wrong answer submission.
// @author       Kumirei
// @include      http://bunpro.jp*
// @include      https://bunpro.jp*
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// @require      https://greasyfork.org/scripts/370623-bunpro-helpful-events/code/Bunpro:%20Helpful%20Events.js?version=615700
// @grant        none
// ==/UserScript==

(function() {
		// Seconds of delay
		const delay = 2;

		// Wait until we're reviewing
		$('HTML')[0].addEventListener('quiz-page', function() {
				// Add the standard styling to the disabled button
				addCSS();

				// Do stuff when we press enter or backspace
				$('#study-answer-input').on('keydown', function(event) {
						var elem = $('#study-answer-input');
						// Initiate delate when we press enter, get the answer wrong, and no delay is already active
						if (event.which == 13 && elem[0].style.background == "rgba(255, 77, 77, 0.8)" && !$('#submit-study-answer-disabled').length) {
								enableDelay();
								setTimeout(disableDelay, delay*1000);
						}
				});
				$('body').on('keydown', function(event) {
						// Cancel delay if we press backspace after getting an answer wrong
						if (event.which == 8 && $('#submit-study-answer-disabled').length) disableDelay();
				});
		});

		// Makes user unable to continue to the next item
		function enableDelay() {
				$('#study-answer-input')[0].blur();
				$('#submit-study-answer').attr('id', 'submit-study-answer-disabled');
		}

		// Makes user able to continue to the next item again
		function disableDelay() {
				$('#submit-study-answer-disabled').attr('id', 'submit-study-answer');
		}

		// Adds the needed CSS
		function addCSS() {
				$('head').append('<style>#submit-study-answer-disabled {' +
								 'width: 15%;' +
								 'right: 0;' +
								 'text-align: center;' +
								 'position: absolute;' +
								 'font-weight: 400;' +
								 'font-size: 20px;' +
								 'z-index: 100;' +
								 'border-radius: 0;' +
								 'color: white;' +
								 'background: transparent;' +
								 '}' +
								 '@media (max-width: 480px) #submit-study-answer-disabled {font-size: 12px !important;}</style>')
		}
})();