// ==UserScript==
// @name        FIMFiction - Blog Word-Count
// @namespace   Selbi
// @include     http://www.fimfiction.net/blog/*
// @version     1.1
// @grant       none
// @description Display a small block at the start of every blog entry, displaying word-count and estimated reading time.
// ==/UserScript==


// Enter your average reading speed in "Words-Per-Minute":
const WPM = 250;


// Store wordcount of the blog as integer:
var blogLength = countWords( $(".blog_post_content").text() );

// Put the word-count at the top of the blog, right below the headline:
$(".main:first").prepend(
	'<div style="margin:10px; text-align:center; font-size:12px;">' +

		'<div>' +
			'Total Word-Count:' +
		'</div>' +

		'<div style="font-size:20px;">' +
			numberWithCommas(blogLength) +
		'</div>' +

		'<div style="font-size:10px">' +
			'[' + readingTime(blogLength, WPM) + ']' +
		'</div>' +

	'</div><hr>'
);


// Return the total amount of words of the input String as Integer.
//   "Hello, good sir!" -> 3
function countWords(inputstring){
	var trimmedstring = inputstring	.replace(/(^\s*)|(\s*$)/gi,"")	// Remove all empty lines.
					.replace(/[ ]{2,}/gi," ")	// Reduce all extra spaces down to one.
					.replace(/\n /,"\n")		// Remove all spaces after a line break.
					.split(' ');			// Split string between spaces into an array.
	return trimmedstring.length;				// Return the length of the array (each entry represents exactly one word).
}


// Return the input String or Integer as a String with three-spaced commas.
//   1234 -> 1,234
//   123  -> 123
function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// Return the estimated reading time based on the input word count and a constant WPM as number with time unit.
//   (200, 250)  -> "<1 min"
//   (3000, 250) -> "12 min"
//   (9000, 100) -> "1.5 h"
function readingTime(wordcount, wordpermin) {
	var time = (wordcount / wordpermin);
	var unit = "min";
	
	if (time < 1.0) {
		time = "<1";
	} else {
		time = Math.ceil(time);
		if (time >= 60) {
			time = (time / 60.0).toFixed(1);
			unit = "h";
		}
	}

	return (time + ' ' + unit);	
}