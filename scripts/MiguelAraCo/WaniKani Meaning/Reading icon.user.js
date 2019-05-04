// ==UserScript==
// @name WaniKani Meaning/Reading icon
// @description Hides english translations and lets the user toggle them at will
// @namespace   https://miguel.araco.mx
// @version     1.0.0
// @include     https://www.wanikani.com/review/session
// @copyright   2018+, Miguel Aragon
// @license     MIT; http://opensource.org/licenses/MIT
// @run-at      document-end
// @grant       none
// @esversion
// ==/UserScript==
(function() {
	"use strict";

	const $question = document.querySelector("#question");
	const $questionType = document.querySelector("#question-type");

	function initialize() {
		addGlobalCSS();

		let mutationObserver = new MutationObserver(handleMutation);
		mutationObserver.observe($questionType, {
			attributes: true,
			childList: false,
			subtree: false
		});
	}

	function addGlobalCSS() {
		let css = `
			#character.vocabulary > span,
			#character.kanji > span {
				padding: 8px 8px 0;
			}
			.ma-reading #character.vocabulary > span,
			.ma-reading #character.kanji > span {
				border: 2px dashed white;
			}
			.ma-meaning #character.vocabulary > span,
			.ma-meaning #character.kanji > span {
				border: 2px solid white;
			}
		`;

		let style = document.createElement("style");
		style.type = "text/css";
		style.innerHTML = css;
		document.getElementsByTagName("head")[0].appendChild(style);
	}

	function handleMutation( mutations, mutationObserver ) {
		let classChanged = false;
		for( let mutation of mutations ) {
			if( mutation.type !== "attributes" ) continue;
			if( mutation.attributeName !== "class" ) continue;

			classChanged = true;
			break;
		}

		if( ! classChanged ) return;

		changeTypeClass();
	}

	function changeTypeClass() {
		const type = $questionType.classList.contains("meaning") ? "meaning" : $questionType.classList.contains("reading") ? "reading" : "";

		resetClasses();

		$question.classList.add( `ma-${type}` );
	}

	function resetClasses() {
		$question.classList.remove( "ma-meaning" );
		$question.classList.remove( "ma-reading" );
	}

	initialize();
})();
