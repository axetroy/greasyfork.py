// ==UserScript==
// @name        Submit to Tab on Ctrl + Click
// @description Sets form's target to `_blank` when submitted via Ctrl + Left Mouse Button or Ctrl + Enter.
// @namespace   http://eldar.cz/myf/
// @license     MIT
// @version     1.0.2
// @grant       none
// ==/UserScript==
;(function(){
"use strict";

var FORM_EL;
var FORM_ORIG_TGT; 
var RESTORE_PENDING;

function mousedown(e) {
	if(e.target.form && e.ctrlKey && e.buttons === 1) {
		FORM_EL = e.target.form;
	 	FORM_ORIG_TGT = FORM_EL.target;
		FORM_EL.target = '_blank';
	}
}
function keypress(e) {
	if(e.target.form && e.ctrlKey && e.keyCode === 13) {
		FORM_EL = e.target.form;
	 	FORM_ORIG_TGT = FORM_EL.target;
		FORM_EL.target = '_blank';
		setTimeout(restoreform, 200);
	}
} 
// Cleanup must be delayed because click-submit must finish like normally.
// Artificial .submit() or .click() of dirty target="_blank"ed form could trigger popup blocker.
// That's why listening to middle click is quite futile.
function restoreform() {
	if(FORM_ORIG_TGT) {
		FORM_EL.target = FORM_ORIG_TGT;
	} else {
		FORM_EL.removeAttribute('target');
	}
	FORM_EL = null;
	FORM_ORIG_TGT = null; 
	RESTORE_PENDING = false;
}
// There is no other way to do somehing "after submit" than via timeout, is there?
function mouseup(e) {
	if(FORM_EL && !RESTORE_PENDING) {
		RESTORE_PENDING = true;
		setTimeout(restoreform, 200);
	}
}

document.body.addEventListener('mousedown', mousedown, true);
document.body.addEventListener('mouseup', mouseup, true);
document.body.addEventListener('keypress', keypress, true);

})();
