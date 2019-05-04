// ==UserScript==
// @name        Salesforce Refresh Reports
// @namespace   jamie-thompson.co.uk
// @description Refreshes Salesforce Reports
// @include     https://eu1.salesforce.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     2
// @grant       none
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
jQuery("#AppBodyHeader").hide();
jQuery(".dashBackLink").hide();
jQuery(".bPageFooter").hide();
jQuery(".links").hide();

function autorefresh() {
	document.getElementById('refreshButton').click();
	setTimeout(autorefresh, 30000);
}

autorefresh();