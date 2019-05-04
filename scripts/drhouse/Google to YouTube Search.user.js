// ==UserScript==
// @name               Google to YouTube Search
// @namespace          https://greasyfork.org/en/users/10118-drhouse
// @version            2.0
// @description        Use your Google Search terms to search YouTube by clicking a new YouTube link added to your Google Search page.
// @run-at             document-start
// @include            https://www.google.*/search*
// @require            http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author             drhouse
// @icon               https://www.programmatic-italia.com/wp-content/uploads/2014/12/Google.png
// ==/UserScript==

$(document).ready(function () {
	var gquery = $('input.gLFyf.gsfi').val();
	$('#hdtb-tls').css('margin-right','0px');
	$('<div class="hdtb-mitem hdtb-imb" id="above"><a class="q qs" href="https://www.youtube.com/results?search_query='+encodeURIComponent(gquery)+'">YouTube</a></div>').insertAfter("#hdtb-tls");
});
