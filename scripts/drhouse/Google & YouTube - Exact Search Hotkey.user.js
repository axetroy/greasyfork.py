// ==UserScript==
// @name         Google & YouTube - Exact Search Hotkey
// @namespace    GYESH
// @description  Simply press the NumpadAdd hotkey on your selected term(s) in the search box and they will be auto-encased in quotes, using Google's "exact search" boolean syntax - no more tedious cursor positioning or unrelated search results.
// @run-at       document-start
// @include      htt*://*.google.*/*
// @include      htt*://google.*/*
// @include      htt*://*.youtube.*/*
// @include      htt*://youtube.*/*
// @include      htt*://*.bing.*/*
// @include      htt*://bing.*/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author       drhouse
// @icon         https://www.google.ca/images/google_favicon_128.png
// @version      3.0
// ==/UserScript==

$(document).ready(function () {
	var text, nquote, lastChar, replit;

	function getSelectionText() {
		text = "";
		if (window.getSelection) {
			text = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
			text = document.selection.createRange().text;
		}
		lastChar = text.substr(text.length - 1);
		while (lastChar == ' '){
			text = text.slice(0,-1);
			lastChar = text.substr(text.length - 1);
		}
		nquote = '"'+text+'"';
		return nquote;
	}

    $("input.gLFyf.gsfi").keypress(function( event ) { //Google Search
		if ( event.which == 43 ) { //NumpadAdd key
			event.preventDefault();
			console.log(getSelectionText());
			replit = $("input.gLFyf.gsfi").val().replace(text,getSelectionText());
			$("input.gLFyf.gsfi").val(replit);
		}
	});


	$("#lst-ib").keypress(function( event ) { //Google Search
		if ( event.which == 43 ) { //NumpadAdd key
			event.preventDefault();
			console.log(getSelectionText());
			replit = $("#lst-ib").val().replace(text,getSelectionText());
			$("#lst-ib").val(replit);
		}
	});
	
	$("#masthead-search-term").keypress(function( event ) { //YouTube Search
		if ( event.which == 43 ) { //NumpadAdd key
			event.preventDefault();
			console.log(getSelectionText());
			replit = $("#masthead-search-term").val().replace(text,getSelectionText());
			$("#masthead-search-term").val(replit);
		}
	});
	
	    $("#sb_form_q").keypress(function( event ) { //Bing Search
		if ( event.which == 43 ) { //NumpadAdd key
			event.preventDefault();
			console.log(getSelectionText());
			replit = $("#sb_form_q").val().replace(text,getSelectionText());
			$("#sb_form_q").val(replit);
		}
	});
});