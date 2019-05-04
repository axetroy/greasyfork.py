// ==UserScript==
// @name         Video Repubblica in HTML5
// @namespace    http://andrealazzarotto.com/
// @version      1.0.4
// @description  Allows to watch MP4 videos on the Repubblica.it website with a HTML5 container
// @author       Andrea Lazzarotto
// @match        http://video.repubblica.it/*
// @match        https://video.repubblica.it/*
// @copyright    2012+, Andrea Lazzarotto - GPLv3 License
// @require      http://code.jquery.com/jquery-latest.min.js
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

$(document).ready(function() {
	var contentURL = $('meta[itemprop=contentUrl]').attr('content');
	if(!!contentURL && contentURL.indexOf('.mp4') > 0)
		$('#playerCont').empty().append('<video src="' + contentURL + '" controls autoplay width="100%" height="100%"></video>');
	var isEmbed = (location.href.indexOf("repubblica.it/embed") > 0 && !!unsafeWindow.player_1);
	if (isEmbed && !!unsafeWindow.player_1.model.formats.mp4) {
		$('#content').empty().append('<video src="' + unsafeWindow.player_1.model.formats.mp4 + '" controls style="width: 100%; height: 100vh"></video>');
		$("body").css("overflow", "hidden");
	}
});