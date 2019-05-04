// ==UserScript==
// @name         SatoriReviewKeybinder
// @namespace    SatoriReviewKeybinder
// @description  Binds Space/Enter, 0, 1, 2, 3, 4 keys to review buttons. Changes MISS button to AGAIN. Hides SRS Intervals.
// @version      0.8.3
// @include      https://www.satorireader.com/review/srs*
// @require    	 http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

// SPACE = 32
// ENTER = 13
// 0 = 48
// 1 = 49
// 2 = 50
// 3 = 51
// f = 102

const HIDE_SRS_TIMES = true;

const ZEROKEY = 48;
const ONEKEY = 49;
const TWOKEY = 50;
const THREEKEY = 51;
const FOURKEY = 52;
const ENTERKEY = 13;
const SPACEKEY = 32;

const MISSKEY = ONEKEY;
const HARDKEY = TWOKEY;
const MEDKEY = THREEKEY;
const EASYKEY = FOURKEY;

$(document).ready(function()
{
	$("div#review-question-show-answer-button").html("Show Answer (Enter/Space)");
	$("div#review-question-button-miss").html("AGAIN ("+ (MISSKEY-48).toString() +")");
	$("div#review-question-button-miss").css("background-color", "#15465E");
	
	// blank stuff
	$("div.review-question-button-label").html("");
	if (HIDE_SRS_TIMES) {
		$("div#review-question-button-miss-caption").html("&nbsp;");
		$("div#review-question-button-q3-caption").css("color", "#ffffff");
		$("div#review-question-button-q4-caption").css("color", "#ffffff");
		$("div#review-question-button-q5-caption").css("color", "#ffffff");
	}
	
	$("div.review-question-button-label").css("border-bottom", "0");
	
	$("div#review-question-button-q3").html("HARD ("+ (HARDKEY-48).toString() +")");
	$("div#review-question-button-q4").html("MEDIUM ("+ (MEDKEY-48).toString() +"/E)");
	$("div#review-question-button-q5").html("EASY ("+ (EASYKEY-48).toString() +")");
	$(document).keypress(function(e)
	{
		console.log("PRESS: " + e.which);
		var bValidButton = false;
		switch(e.which)
		{
			case SPACEKEY: 
				$("div#review-question-show-answer-button").click();
				e.preventDefault(); 
				break;
			
			case ENTERKEY: 
				// if the SHOW ANSWER button is visible press it, otherwise press the MEDIUM or NEXT SET button
				if ( $("div#review-question-show-answer-button").is(':visible') ) {
					$("div#review-question-show-answer-button").click();
					bValidButton = true;
				} else if ($("div#review-results-start-another-set-button").is(':visible') ) {
					$("div#review-results-start-another-set-button").animate({"background-color":"#FFC400"}, 100);
					$("div#review-results-start-another-set-button").animate({"background-color":"#ff9300"}, 100);
					
					$("div#review-results-start-another-set-button").click();
					bValidButton = true;
				} else {
					$("div#review-question-button-q4").animate({"background-color":"#FFC400"}, 100);
					$("div#review-question-button-q4").animate({"background-color":"#1B84B8"}, 100);
					
					$("div#review-question-button-q4").click();
					bValidButton = true;
				}
				
				if (bValidButton) { e.preventDefault(); }
				break;
			
			case MISSKEY: 	
				if ( $("div#review-question-button-miss").is(':visible') ) {
					$("div#review-question-button-miss").animate({"background-color":"#FFC400"}, 100);				
					$("div#review-question-button-miss").animate({"background-color":"#15465E"}, 100);				
					
					$("div#review-question-button-miss").click();
					e.preventDefault();
					bValidButton = true;
				}
				break;
			
			case HARDKEY: 
				if ( $("div#review-question-button-q3").is(':visible') ) {
					$("div#review-question-button-q3").animate({"background-color":"#FFC400"}, 100);
					$("div#review-question-button-q3").animate({"background-color":"#1B5B7B"}, 100);
					
					$("div#review-question-button-q3").click();
					e.preventDefault();
					bValidButton = true;
				}
				break;
			
			case MEDKEY: 
				if ( $("div#review-question-button-q4").is(':visible') ) {
					$("div#review-question-button-q4").animate({"background-color":"#FFC400"}, 100);
					$("div#review-question-button-q4").animate({"background-color":"#1B84B8"}, 100);
					
					$("div#review-question-button-q4").click();
					e.preventDefault();
					bValidButton = true;
				}
				break;	
			
			case EASYKEY: 
				if ( $("div#review-question-button-q5").is(':visible') ) {
					$("div#review-question-button-q5").animate({"background-color":"#FFC400"}, 100);
					$("div#review-question-button-q5").animate({"background-color":"#39B0EC"}, 100);
					
					$("div#review-question-button-q5").click();
					e.preventDefault();
					bValidButton = true;
				}
				break;
						
		}
		if (bValidButton) { return false; }
	});
});
