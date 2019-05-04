// ==UserScript==
// @name        USERSTYLES - TABLES Sorter SIMPLE
// @author      decembre
// @namespace   https://greasyfork.org/fr/users/8-decembre 

// @description Sort Table in Your Profile page

// @include     https://userstyles.org/*

// @version     01.03
// @grant       none
// @require     https://greasyfork.org/scripts/12036-mutation-summary/code/Mutation%20Summary.js?version=70722
// @require     https://greasyfork.org/scripts/5844-tablesorter/code/TableSorter.js
// 

// FROM : Metal Archives (discography pages) - Reviews column split and sortable tables
// BY darkred
// https://greasyfork.org/fr/scripts/5751-metal-archives-discography-pages-reviews-column-split-and-sortable-tables/code

// This userscript uses jQuery UI, the jQuery plugin 'tablesorter' (forked by Rob Garrison (Mottie)) http://mottie.github.io/tablesorter/docs/index.html
// and the JavaScript library 'Mutation Summary' (https://github.com/rafaelw/mutation-summary) (by Rafael Weinstein)
//
// @namespace rikkie
// ==/UserScript==

// TEST for <table class="author-styles">
// TEST SELECTOR
// http://mottie.github.io/tablesorter/docs/example-option-selectorsort.html
$(function() {
  // call the tablesorter plugin
  $("table").tablesorter({
	  		cssAsc: 'up',
			cssDesc: 'down',
            selectorSort : 'th',
            sortInitialOrder: "desc",
			widgets: ["zebra"],
			widgetOptions: {
			zebra: ["odd","even"]
}

});
});


// CSS rules in order to show 'up' and 'down' arrows in each table header
var stylesheet = `
<style>
.author-styles th {
	background-repeat: no-repeat;
	background-position: right center;
//background-color: white !important;
}
.author-styles th.up {
	padding-right: 20px;
	background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7);
background-color: white !important;
}
.author-styles th.down {
	padding-right: 20px;
	background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7);
background-color: white !important;
}
</style>`;

$('head').append(stylesheet);