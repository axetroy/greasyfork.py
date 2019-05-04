// ==UserScript==
// @name        Lightbox hack
// @description A temporary fix for the Lightbox bug on A-P
// @namespace   http://localhost
// @include     http://www.anime-planet.com/*
// @version     1
// @grant       none
// ==/UserScript==
if (typeof(unsafeWindow.Lightbox) == 'undefined') {
	unsafeWindow.Lightbox = {
		init : function(c)
		{
			$(".screenshots").click(function() {
				$.fancybox([c], {
					type: "image",
					titlePosition: "over",
					centerOnScroll: true,
					changeFade: 0
				})
			})
		}
	};
};