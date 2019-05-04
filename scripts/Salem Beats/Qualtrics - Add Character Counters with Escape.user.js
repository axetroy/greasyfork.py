// ==UserScript==
// @name         Qualtrics - Add Character Counters with Escape
// @namespace    salembeats
// @version      1.5
// @description  Press escape and all text fields and textareas get character counters beneath them.
// @author       Cuyler Stuwe (salembeats)
// @include      /.*qualtrics.*/
// @grant        none
// ==/UserScript==

const KEYCODE_ESCAPE = 27;

function createCharacterCountersForAllTextFields() {
	document.querySelectorAll("input[type='TEXT'],textarea").forEach( (el) => {
		let newElement = document.createElement("DIV");
		newElement.innerText = "Characters Entered: [], Word Estimate: []";
		el.insertAdjacentElement('afterend', newElement);
		el.addEventListener('keyup', () => {
			let numberOfSpaces = (el.value.match(/ /g) || "").length;
			newElement.innerText = `Characters Entered: [${el.value.length}], Word Estimate: [${numberOfSpaces}]`;
		});
	} );
}

function handleKeypress(e) {

	if(e.keyCode === KEYCODE_ESCAPE) {

		createCharacterCountersForAllTextFields();
	}
}

(function() {
	'use strict';

	document.addEventListener('keyup', handleKeypress);

})();