// ==UserScript==
// @name         Manager Button
// @namespace    https://updater.my.salesforce.com
// @version      0.2
// @description  Custom JS to change manager button text
// @author       Michael Smith and Michael Breiner
// @match        *://updater--sandbox.cs22.my.salesforce.com/*
// @match        *://updater.my.salesforce.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant        none
// ==/UserScript==

var managerButtonMode = 'createManager';

// Run this 2 seconds after the page loads.
setTimeout(function() { 

	// Find the special formula field that has our details on what to do 
	// with this button. The expected values are
	// - SHOW (show as 'Make a Manager')
	// - RENAME (show as 'Remove Manager')
	// - HIDE (hide the button)
	var specialFieldLabel$ = $(".labelCol:contains('SYSTEM: Make a Manager Button Action'):first");
	var specialFieldValue$ = specialFieldLabel$.next();

	// If the custom field cannot be found, hide the button by default since
	// the current user may not have access to the field
	if (!specialFieldLabel$ || specialFieldValue$.text() === 'HIDE') {
		$("input.btn[name='make_a_manager']").hide();	
	} else if (specialFieldValue$.text() === 'RENAME') {
		$("input.btn[name='make_a_manager']").val('Remove as Manager').prop("title","Remove as Manager");
		managerButtonMode = 'removeManager';
	}

	if (specialFieldLabel$) {
		// Hide this formula field on the layout. It should be in the right column
		// with nothing to the left for it to render nicely once hidden
		specialFieldLabel$.hide();
		specialFieldValue$.hide();
	}

}, 2000);