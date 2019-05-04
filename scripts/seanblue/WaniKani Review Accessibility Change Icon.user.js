// ==UserScript==
// @name          WaniKani Review Accessibility Change Icon
// @namespace     https://www.wanikani.com
// @description   Update icon next to input after answering a review based on whether the answer was correct or not. Designed to help colorblind users.
// @author        seanblue
// @version       1.0.0
// @include       https://www.wanikani.com/lesson/session
// @include       https://www.wanikani.com/review/session
// @grant         none
// ==/UserScript==

(function($) {
	let style = `<style>
	#answer-form .correct i:before { content: "\\f058"; }
	#answer-form .incorrect i:before { content: "\\f057"; }
	#answer-form .close i:before { content: "\\f059"; }
</style>`;

	$('head').append(style);
})(window.jQuery);