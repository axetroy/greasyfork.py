// ==UserScript==
// @name         10fastfingers.com - Typing speed
// @namespace    10fastfingers.com
// @version      0.3
// @description  Shows approximate typing speed in wpm while typing
// @author       puzzle
// @match        https://10fastfingers.com/typing-test/*
// @match        https://10fastfingers.com/advanced-typing-test/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	var WORD_LENGTH = 5, correctChars = 0;

	var speedContainer = document.querySelector('#speedtest-main > div:nth-child(7) > div.col-md-6.col-sm-4.hidden-xs');

	var speedElem = document.createElement('span');
	speedElem.style = "font-size: 26px; font-weight: bold;";

	speedContainer.insertAdjacentElement('beforeEnd',speedElem);

	document.addEventListener('keyup',function(e) {
		if (e.keyCode === 32) {
			var lastWord, stream = user_input_stream;
			lastWord = stream.slice(stream.lastIndexOf(' ',stream.length-2)+1,-1);
			if (words[word_pointer-1] === lastWord) {
				correctChars += words[word_pointer-1].length + 1;
			}
		}
	});

    setInterval(function() {
        var avgSpeed = 0;
        if (countdown === 60) {
            correctChars = 0;
        } else {
            avgSpeed = correctChars*60/(60-countdown)/WORD_LENGTH;
        }
        speedElem.innerText = avgSpeed.toFixed(1) + " wpm";
    },1000);

})();