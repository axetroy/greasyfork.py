// ==UserScript==
// @name        JR Bark Engineering
// @namespace   https://greasyfork.org/users/6406
// @version     0.1
// @description A script to help with Bark engineering.
// @include     http*://*.mturkcontent.com/dynamic/*
// @include     http*://s3.amazonaws.com/mturk_bulk/*
// @require     http://code.jquery.com/jquery-2.1.4.min.js
// @grant       none
// ==/UserScript==

function isHitPage() { return $('div.panel-body:contains("Below is a message received by an 8 year old on social media.")').length; }
function iscyberbulling() { return $('div.panel-body:contains("Is this child being cyberbullied?")').length; }

$(function() {
	if (isHitPage()) { console.log("found bark");
		if (iscyberbulling()) {
			$("label:eq(0)").before($("<span>").html("(1) "));
			$("label:eq(1)").before($("<span>").html("(2) "));
		} else {
			$("label:eq(1)").before($("<span>").html("(1) "));
			$("label:eq(2)").before($("<span>").html("(2) "));
			$("label:eq(3)").before($("<span>").html("(3) "));
			$("label:eq(4)").before($("<span>").html("(4) "));
			$("label:eq(5)").before($("<span>").html("(5) "));
			$("label:eq(6)").before($("<span>").html("(0) "));
		}
		$("div.checkbox:first").focus();
		$(document).keydown(function(e) {
			$('input[value="none"]:first').prop('checked', false);
			switch(e.which) {
				case 27:
				case 96:
				case 48:
					$('input').prop('checked', false);
					$('input[value="none"]:first').prop('checked', true);
					$('#submitButton').click();
					e.preventDefault();
					break;
				case 49:
				case 97:
					$('input[value="cyberbullying"]:first').prop('checked', true);
					if (iscyberbulling()) $('#submitButton').click();
					break;
				case 50:
				case 98:
					if (iscyberbulling()) {
						$('input[value="none"]:first').prop('checked', true);
						$('#submitButton').click();
					}
					else $('input[value="depression"]:first').prop('checked', true);
					break;
				case 51:
				case 99:
					$('input[value="drugs"]:first').prop('checked', true);
					break;
				case 52:
				case 100:
					$('input[value="sex"]:first').prop('checked', true);
					break;
				case 53:
				case 101:
					$('input[value="violence"]:first').prop('checked', true);
					break;
				case 13:
					$('#submitButton').click();
					break;
			}
		});
		$("canvas:first").focus();
	}
});
