// ==UserScript==
// @name         Youtube Comments
// @namespace    Youtube.com
// @author       Puzzle
// @version      0.4.1
// @description  Adds comment's author name to the reply box, when reply link is clicked. Script works with old youtube layout only.
// @include      *://*.youtube.com/watch*
// @match        *://*.youtube.com/watch*
// @run-at       document-end
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';
	
	function setEndOfContenteditable(contentEditableElement){
		var range,selection;
		if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
		{
			range = document.createRange();
			range.selectNodeContents(contentEditableElement);
			range.collapse(false);
			selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		}
		else if(document.selection)//IE 8 and lower
		{ 
			range = document.body.createTextRange();
			range.moveToElementText(contentEditableElement);
			range.collapse(false);
			range.select();
		}
	}
	
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.addedNodes.length && mutation.target.className == 'comment-renderer-replybox comment-simplebox-content') {
				var commentBox = mutation.target;
				var name = commentBox.querySelector('.yt-thumb-clip > img').getAttribute('alt');
				var textBox = commentBox.querySelector('.comment-simplebox-text');
				textBox.textContent = `${name}, `;
				setEndOfContenteditable(textBox);
			}
		});    
	});
	
	var target = document.body;
	var config = { childList: true, subtree: true };

	observer.observe(target, config);
	
})();