// ==UserScript==
// @name          WaniKani Review Audio Tweak 3
// @namespace     https://www.wanikani.com
// @description   Eliminates distinction between readings and meanings for play-audio-button availability during reviews.
// @author        purajunyakara
// @version       1.0.0
// @include       http*://www.wanikani.com/review/session*
// @run-at        document-end
// @grant         none
// ==/UserScript==

// Original version by Takuya Kobayashi: https://greasyfork.org/en/scripts/10184-wanikani-review-audio-tweak
// Tweak 2, by seanblue, was a reupload with a new URL: https://greasyfork.org/en/scripts/34861-wanikani-review-audio-tweak-2
// This version is basically a fork, changing the functionality entirely. Maybe it should eventually have an entirely different name.

(function () {
	'use strict';

	var audioUrlPrefix = 'https://cdn.wanikani.com/subjects/audio/';

	additionalContent.audio = function (audioAvailableForMeaningsToo) {
		var buttonElem, liElem, currentItem, audioElem;
		currentItem = $.jStorage.get('currentItem');

		$('audio').remove();

		if (currentItem.aud) {

			liElem = $('#option-audio');
			buttonElem = liElem.find('button');
			buttonElem.removeAttr('disabled');
			audioElem = $('<audio></audio>').appendTo(liElem.removeClass('disabled').children('span'));

			$('<source></source>', {
				src: audioUrlPrefix + currentItem.aud,
				type: 'audio/mpeg'
			}).appendTo(audioElem);

			$('<source></source>', {
				src: audioUrlPrefix + currentItem.aud.replace('.mp3', '.ogg'),
				type: 'audio/ogg'
			}).appendTo(audioElem);

			audioElem[0].addEventListener('play', function () {
				buttonElem.removeClass('audio-idle').addClass('audio-play');
			});

			audioElem[0].addEventListener('ended', function () {
				buttonElem.removeClass('audio-play').addClass('audio-idle');
			});

			buttonElem.off('click');
			buttonElem.on('click', function () {
				audioElem[0].play();
			});

			liElem.off('click');
			liElem.on('click', function () {
				if ($('#user-response').is(':disabled')) {
					$('audio').trigger('play');
				}
			});
		}
	};
}());
