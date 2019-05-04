// ==UserScript==
// @name         fCC Formatting
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Prettier, customized formatting on fCC. (By default, prefer Operator Mono Light or Fira Code Light if installed over the fCC default).
// @author       Cuyler Stuwe
// @include      https://www.freecodecamp.org/*
// @grant        none
// ==/UserScript==

// Set up your desired fCC formatting using these constants.

const CSS_FONT_FAMILY_LIST_TO_USE = '"Operator Mono Light", "Fira Code Light", "Ubuntu Mono"';
const USE_ITALIC_COMMENTS = true;

// Setting this to true will display a textarea that you can use to preview font changes.
const SHOW_FONT_EDITOR_TEXTAREA = false;

// Setting anything in this section to "" will use fCC defaults.
// Otherwise it will use the color specified in the string (Anything valid in CSS, no colon/semicolon required).
let  SET_DEFAULT_FONT_COLOR_TO = "";
let  SET_COMMENT_FONT_COLOR_TO = "";
let  SET_KEYWORD_FONT_COLOR_TO = "";
let  SET_STRING_FONT_COLOR_TO = "";
let  SET_NUMBER_FONT_COLOR_TO = "";
let  SET_DEFINITION_FONT_COLOR_TO = "";
let  SET_PROPERTY_FONT_COLOR_TO = "";
let  SET_BACKGROUND_COLOR_TO = "";

// Set this to the name of a color scheme, and watch the color scheme unfold.
setColorTheme("blackice");

function setColorTheme(themeName) {

	switch(themeName.toLowerCase().replace(/ /g, "")) {
		case "blackice":
			SET_DEFAULT_FONT_COLOR_TO = "";
			SET_COMMENT_FONT_COLOR_TO = "#ABCDEF";
			SET_KEYWORD_FONT_COLOR_TO = "#FFFFFF";
			SET_STRING_FONT_COLOR_TO = "#666";
			SET_NUMBER_FONT_COLOR_TO = "#666";
			SET_DEFINITION_FONT_COLOR_TO = "#AAAAAA";
			SET_PROPERTY_FONT_COLOR_TO = "#AAAAAA";
			SET_BACKGROUND_COLOR_TO = "#000000";
			break;
		default:
			SET_DEFAULT_FONT_COLOR_TO = "";
			SET_COMMENT_FONT_COLOR_TO = "";
			SET_KEYWORD_FONT_COLOR_TO = "";
			SET_STRING_FONT_COLOR_TO = "";
			SET_NUMBER_FONT_COLOR_TO = "";
			SET_DEFINITION_FONT_COLOR_TO = "";
			SET_PROPERTY_FONT_COLOR_TO = "";
			SET_BACKGROUND_COLOR_TO = "";
			break;
	}
}

// Keycode definitions.
const KEYCODE_ENTER = 13;

function tryUntilFound( selector, interval, selectorFunction ) {
	var intervalID = setInterval( function() {
		node = document.querySelector(selector);
		if(node !== undefined) {clearInterval(intervalID); selectorFunction(selector); console.log("did it");}
		else {}

	}, interval);
}

(function() {
	'use strict';

	if(CSS_FONT_FAMILY_LIST_TO_USE) {document.styleSheets[0].insertRule(`form.code pre span {font-family: ${CSS_FONT_FAMILY_LIST_TO_USE};}`, 0);}
	if(USE_ITALIC_COMMENTS) {document.styleSheets[0].insertRule(`.cm-comment {font-style: italic;}`, 0);}
	if(SET_COMMENT_FONT_COLOR_TO) {document.styleSheets[0].insertRule(`div .CodeMirror-line span .cm-comment {color: ${SET_COMMENT_FONT_COLOR_TO};}`, 0);}
	if(SET_KEYWORD_FONT_COLOR_TO) {document.styleSheets[0].insertRule(`.night div .CodeMirror-line span .cm-keyword {color: ${SET_KEYWORD_FONT_COLOR_TO};}`, 0);}
	if(SET_DEFAULT_FONT_COLOR_TO) {document.styleSheets[0].insertRule(`div .CodeMirror-line span .cm-variable {color: ${SET_DEFAULT_FONT_COLOR_TO};}`, 0);}
	if(SET_STRING_FONT_COLOR_TO) {document.styleSheets[0].insertRule(`.night div .CodeMirror-line span .cm-string {color: ${SET_STRING_FONT_COLOR_TO};}`, 0);}
	if(SET_NUMBER_FONT_COLOR_TO) {document.styleSheets[0].insertRule(`.night div .CodeMirror-line span .cm-number {color: ${SET_NUMBER_FONT_COLOR_TO};}`, 0);}
	if(SET_DEFINITION_FONT_COLOR_TO) {document.styleSheets[0].insertRule(`div .CodeMirror-line span .cm-def {color: ${SET_DEFINITION_FONT_COLOR_TO};}`, 0);}
	if(SET_PROPERTY_FONT_COLOR_TO) {document.styleSheets[0].insertRule(`.night div .CodeMirror-line span .cm-property {color: ${SET_PROPERTY_FONT_COLOR_TO};}`, 0);}
	if(SET_BACKGROUND_COLOR_TO) {document.styleSheets[0].insertRule(`.CodeMirror.cm-s-monokai.CodeMirror-wrap {background-color: ${SET_BACKGROUND_COLOR_TO};}`, 0);}

	if(SHOW_FONT_EDITOR_TEXTAREA) {
		let newFormHTML = "<div>" +
			"<textarea id='fontSelector'>Arial</textarea>" +
			"</div>";

		tryUntilFound( "#mainEditorPanel > form", 2000, (select) => {
			document.querySelector(select).insertAdjacentHTML('afterend', newFormHTML);
			document.querySelector("#fontSelector").addEventListener('keydown', function(e) {
				if(e.keyCode === KEYCODE_ENTER) {
					e.preventDefault();
					let fontList = document.querySelector("#fontSelector").value;
					console.log(`Font list says ${fontList}`);
					document.querySelectorAll("form.code pre span").forEach((el) => el.style.fontFamily = fontList);
				}
			});
		});
	}

})();