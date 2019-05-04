// ==UserScript==
// @name        KUSports Flash audio replace
// @namespace   www.bricemciver.com
// @description Replace flash audio player with HTML5 audio tag
// @include     http://www2.kusports.com/podcasts/*
// @version     1
// @grant       none
// ==/UserScript==

var $;
if (typeof $ == 'undefined') { 
  $ = unsafeWindow.jQuery;
}

$(document).ready(function() {
  $("object").each(function(index, element) {
    var url = $(element).find("param[name='FlashVars']").attr('value').substring(4).replace("%3A", ":").replace("&", "");
    $(element).replaceWith('<audio controls src="' + url + '">Your user agent does not support the HTML5 Audio element.</audio>');
  });
});