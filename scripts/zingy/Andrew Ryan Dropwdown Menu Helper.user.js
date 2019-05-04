// ==UserScript==
// @name       Andrew Ryan Dropwdown Menu Helper
// @author Dormammu
// @version    4.0
// @description helps with hits
// @match       https://s3.amazonaws.com/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @copyright  you gurl
// @namespace https://greasyfork.org/users/2698
// ==/UserScript==

// press 1 to select No Info Found On Site
$(window).keyup(function(oph) { 
    if (oph.which == 49) {  $('#ReasonForFailure').val('NoInfoOnWebsite'); }
});

// press 2 to submit the hit
$(window).keyup(function(oph) { 
    if (oph.which == 50) {  $( "#submitButton" ).click();  }
});