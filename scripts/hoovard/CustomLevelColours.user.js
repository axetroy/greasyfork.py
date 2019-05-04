// ==UserScript==
// @name         CustomLevelColours
// @namespace    WKCLC
// @run_at       document_end
// @version      0.2
// @description  Change the colours for SRS Levels/Progress percentages to increase contrast for colour blindness.
// @author       Hoovard
// @match        http*://www.wanikani.com/*
// @grant        none
// ==/UserScript==

$(document).ready(customiseColours);

var APPRENTICE_COLOUR = "#ff0000";
var GURU_COLOUR = "#0000ff";
var MASTER_COLOUR = "#00ff00";
var ENLIGHTENED_COLOUR = "#ffffff";
var BURNED_COLOUR = "#000000";

function customiseColours()
{
	// Dashboard and profile page elements
	$("li#apprentice").css("background-color", APPRENTICE_COLOUR);
	$("li#apprentice").css("color", "#ffffff");
	$("li#apprentice span").css("color", "#ffffff");
	$("li#apprentice span").css("text-shadow", "none");	
	$("li#apprentice").css("background-image", "none");
	
	$("li#guru").css("background-color", GURU_COLOUR);
	$("li#guru").css("color", "#000000");
	$("li#guru span").css("color", "#000000");
	$("li#guru span").css("text-shadow", "none");	
	$("li#guru").css("background-image", "none");
	
	$("li#master").css("background-color", MASTER_COLOUR);
	$("li#master").css("color", "#000000");
	$("li#master span").css("color", "#000000");
	$("li#master span").css("text-shadow", "none");	
	$("li#master").css("background-image", "none");
	
	$("li#enlightened").css("background-color", ENLIGHTENED_COLOUR);
	$("li#enlightened").css("color", "#000000");
	$("li#enlightened span").css("color", "#000000");
	$("li#enlightened span").css("text-shadow", "none");	
	$("li#enlightened").css("background-image", "none");
	
	$("li#burned").css("background-color", BURNED_COLOUR);
	$("li#burned").css("color", "#ffffff");
	$("li#burned").css("background-image", "none");
	
	// Progress pages
	$(".apprentice-lattice").css("background-color", APPRENTICE_COLOUR);
	$(".apprentice-lattice").css("color", "#ffffff");
	$(".guru-lattice").css("background-color", GURU_COLOUR);
	$(".master-lattice").css("background-color", MASTER_COLOUR);
	$(".master-lattice").css("color", "#000000");
	$(".enlighten-lattice").css("background-color", ENLIGHTENED_COLOUR);
	$(".enlighten-lattice").css("color", "#000000");
	$(".burned-lattice").css("background-color", BURNED_COLOUR);
	
	// combined progress
	$(".percentage-0-20").css("background-color", APPRENTICE_COLOUR);
	$(".percentage-0-20").css("color", "#ffffff");
	$(".percentage-21-40").css("background-color", GURU_COLOUR);
	$(".percentage-41-60").css("background-color", MASTER_COLOUR);
	$(".percentage-61-80").css("background-color", ENLIGHTENED_COLOUR);
	$(".percentage-61-80").css("color", "#000000");
	$(".percentage-81-100").css("background-color", BURNED_COLOUR);
}
