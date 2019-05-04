// ==UserScript==
// @name        FIMFiction - Random Story
// @namespace   Selbi
// @include     http*://*fimfiction.net/*
// @version     1.4
// @require     http://code.jquery.com/jquery-1.11.0.min.js
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @description Adds a button to random jump to a story page. You need to refresh the number of stories manually.
// ==/UserScript==


//GM_deleteValue("storycount");

var numberofstories = GM_getValue("storycount");
var randomstory = 0;
if (numberofstories == undefined) {numberofstories = "0";}
randomstory = Math.floor(numberofstories * Math.random());
var newstories = 0;

var refreshbutton = '<ul style="width:170px; left:50%; margin-left:-65px;"><li><a href="javascript:void()" class="button" id="refbtn"><i class="fa fa-refresh"></i><span>Refresh (' + numberWithCommas(numberofstories) + ')</span></a></li></ul>';
var mainbutton = '<li><a href="/story/' + randomstory + '" id="randomstoryButton" class="button"><i class="fa fa-book"></i><span>Random Story</span></a>' + refreshbutton + '</li>';

$("nav.user_toolbar li:last").after(mainbutton);

$("#refbtn").click(function() {
	$("#refbtn").html('<i class="fa fa-refresh"></i><span>Refreshing...</span>');
	$.get("//www.fimfiction.net/stories/latest", function(source) {
		$(".button_add_story_to_group", source).each(function(){
			var storyid = $(this).attr("data-story");
			if (+storyid > +newstories) newstories = storyid;
		});
		if (+newstories > +numberofstories) {
			var storydifference = newstories - numberofstories;
			numberofstories = newstories;
			GM_setValue("storycount", numberofstories);
		}
		randomstory = Math.floor(numberofstories * Math.random());
		$("#randomstoryButton").attr("href", '/story/' + randomstory);
		$("#refbtn").html('<i class="fa fa-refresh"></i><center><span>Refresh (' + numberWithCommas(numberofstories) + ')<br>[' + ((storydifference == 0 || storydifference == undefined) ? ("No new") : (numberWithCommas(storydifference) + " new")) + ']</span></center>');
	});
});


function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
