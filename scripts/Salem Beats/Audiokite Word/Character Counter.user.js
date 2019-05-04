// ==UserScript==
// @name         Audiokite Word/Character Counter
// @namespace    salembeats
// @version      2
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      /https://www.audiokite.com/survey/
// @grant        none
// ==/UserScript==

function countWordsInTextArea(textarea) {
	return (textarea.value.match(/ /g) || "").length;
}

function countLettersInTextArea(textarea) {
	return (textarea.value.length);
}

function updateCounterGivenTextArea(counter, textarea) {
	let numberOfWords = countWordsInTextArea(textarea);
	let numberOfLetters = countLettersInTextArea(textarea);
	let wordsHTML = `Words: [${numberOfWords > 0 ? numberOfWords : ' '}]`;
	let lettersHTML = `Letters: [${numberOfLetters > 0 ? numberOfLetters : ' '}]`;
	let aboutHTML = `Written by <a href='http://www.facebook.com/cuyler.stuwe' target='facebook-target'>Cuyler Stuwe</a>.<br/><a href='http://paypal.me/salembeats/' target='donation-target'>Your donation</a> supports development and makes more scripts like this one possible.`;
	counter.innerHTML = "<strong>" + wordsHTML + " " + lettersHTML + "</strong><br/>" + aboutHTML;
}

function handleKeyup(event) {
	let counterToUpdate = document.querySelector(`#${event.target.getAttribute("data-boundto")}`);

	if(countWordsInTextArea(event.target) >= 25) {
		event.target.style.backgroundColor = "green";
		event.target.style.color = "white";
	}
	else {
		event.target.style.backgroundColor = "white";
		event.target.style.color = "black";
	}

	updateCounterGivenTextArea(counterToUpdate, event.target);
}

function attachCounterToTextArea(textArea) {
	let counterElement = document.createElement('DIV');
	counterElement.id = textArea.id + "-counter";
	counterElement.innerHTML = "";
	textArea.insertAdjacentElement('afterend', counterElement);
	textArea.setAttribute("data-boundto", counterElement.id);
	textArea.addEventListener('keyup', handleKeyup);
}

(function() {
	'use strict';
	document.querySelectorAll("textarea").forEach(
		(el) => attachCounterToTextArea(el)
	);
})();