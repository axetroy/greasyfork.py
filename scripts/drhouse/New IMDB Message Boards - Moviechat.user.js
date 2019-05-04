// ==UserScript==
// @name               New IMDB Message Boards - Moviechat
// @namespace          https://greasyfork.org/en/users/10118-drhouse
// @version            1.9.2
// @description        Directly integrated replacement on the IMDB message boards using moviechat.org, appears at bottom of all IMDB movie/tv page listings, includes millions of archived posts saved from before the boards closed.
// @run-at             document-start
// @include            https://www.imdb.com/title/*
// @include            https://www.imdb.com/name/*
// @include            http://www.moviechat.org/*
// @include            https://www.moviechat.org/*
// @exclude            https://media-imdb.com/*
// @exclude            https://*.media-imdb.com/*
// @require            http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author             drhouse
// @icon               http://ia.media-imdb.com/images/G/01/imdb/images/favicon-2165806970._CB522736556_.ico
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function () {
		var theparenturl = document.URL;
	
	if (theparenturl.indexOf("reference") != -1)
		theparenturl = theparenturl.replace('reference','');
	
	if (theparenturl.indexOf("combined") != -1)
		theparenturl = theparenturl.replace('combined','');

	var quest = theparenturl.split('?')[0];
	var parts = quest.split('/');
	var lastSegment = parts.pop() || parts.pop();

	var theurl = 'https://www.moviechat.org/movies/';
	
	var simple = (theurl + lastSegment);
	//console.info(simple);  
	
	var chatdiv = $('<div class="article" id="boardsTeaser"><h2>Message Boards</h2>'+
					'Recent Posts'+
					'<br><br></div>').css('display','block').css('overflow','hidden').css('position','relative').css('height','660px').css('width','640px');

	var lastart = $('.article').last();
	$(chatdiv).insertBefore(lastart);
	//lazy else
	$(chatdiv).insertBefore('#tn15bot');

	var ifrm = document.createElement("iframe");
	ifrm.setAttribute("id", "msgframe");
	ifrm.setAttribute("src", simple);
	ifrm.setAttribute("style", "scrolling=no;position=absolute;padding=0px");
	ifrm.setAttribute("frameborder", "0");
	ifrm.style.height = 600+"px";
	ifrm.style.width = 640+"px";
	$(ifrm).appendTo(chatdiv);

	$('body').css('background-color','#fff');
	$('.main').css('box-shadow','0px 0px 0px 0px');

	var title = $('#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > h1').text();
	var year = $('#titleYear > a').text();
	$('<div class="article"><a href='+simple+'>Discuss '+title+'</a> on the Moviechat message boards »</div><hr>').insertAfter(chatdiv);
	$('.contribute').css('border-top','1px;solid;#ccc');

});
