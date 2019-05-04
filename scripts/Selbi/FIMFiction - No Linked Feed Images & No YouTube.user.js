// ==UserScript==
// @name        FIMFiction - No Linked Feed Images & No YouTube
// @namespace   Selbi
// @include     http*://*fimfiction.net/feed*
// @version     1.1
// @grant       none
// @description In the feed, all linked images will have the link repositioned to a separate button and all YouTube videos will be replaced with a simple link button.
// ==/UserScript==


// Make sure this script is still executed even when refreshing or scrolling down.
// (Right now this works by simply checking for a changed container height every second. If anyone can recommend a better method, please tell me.)
$(document).ready(function(){
	feedCleanup();
	
	var oldheight = $("#feed_columns").height();
	setInterval(function(){
		var newheight = $("#feed_columns").height();
		if (newheight != oldheight) {
			feedCleanup();
			oldheight = newheight;
		}
	}, 1000);
});


function feedCleanup() {
	// Remove links from linked feed images and place it in a separate link button below them.
	$("div.feed_body a img.thumbnail_image").each(function() {
		var url = $(this).parent().attr("href");
		$(this).parent().after('<div><a class="styled_button styled_button_grey" href="' + url + '">Image Link<a/></div>');
		$(this).unwrap();
	});
	
	// Kill embedded YouTube videos and replace them with a plain link button (which is actually already there, just invisible on non-mobile browsers).
	$(".youtube_container").each(function() {
		$(this).find("iframe").remove();
		$(this).find(".link").show();
	});
}