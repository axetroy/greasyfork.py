// ==UserScript==
// @name        FIMFiction - Simplified Read Flow
// @namespace   Selbi
// @include     http*://*fimfiction.net/story/*/*
// @include     http*://*fimfiction.net/chapter/*
// @version     2.2
// @grant       none
// @description Adds the ability to scroll down the story page to the clicked-on paragraph.
// ==/UserScript==

// Set some constants.
const MARGIN_TOP = 20;
const SCROLL_SPEED = 500;
const FADE  = "all 200ms ease";


// Get all paragraphs of this chapter page.
var paragraphs = $("#chapter_container p");


// Create an event listener for clicking on any of these paragraphs.
// Scroll the entire page down to a little over the clicked paragraph.
$(paragraphs).click(function() {

	$('html,body').animate({
		scrollTop:	($(this).offset().top) - MARGIN_TOP
	}, SCROLL_SPEED);
});


// Add some cosmetic effects for hovering over a paragraph.
$(paragraphs).hover(
	// Fade-in
	function(){
		$(this).css({
			cursor :		"pointer",
			//filter :		"invert(100%)",
			"-webkit-transition" :	FADE,
			"-moz-transition" :	FADE,
			"-o-transition" :	FADE,
			"transition" :		FADE,
			"opacity" :		"0.5"
		});
	}
,
	// Fade-out
	function(){
		$(this).css({
			//filter :		"invert(000%)",
			"opacity" :		"1.0"
		});
	}
);