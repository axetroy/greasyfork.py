// ==UserScript==
// @name        BTN - collapse show info
// @description shrink/expand the show info box
// @namespace   diff
// @include     http*://broadcasthe.net/torrents.php?*id=*
// @require	https://code.jquery.com/jquery-1.11.1.min.js
// @grant	none
// @version     0.4
// ==/UserScript==

// don't mess with site's jquery:
this.$ = this.jQuery = jQuery.noConflict(true);  

$("<style type='text/css'> .diffshrink{ overflow:auto; height:10em; cursor: pointer;} .diffpointer { cursor: pointer;}  </style>").appendTo("head");

$("div.head:contains('Show info')")
	.append(" [shrink/expand]")
	.addClass("diffpointer")
	.click(function() {
		$(this).parent().toggleClass("diffshrink");
	})
	.parent().addClass("diffshrink")
		.children("div.body").click(function() {
			$(this).parent().removeClass("diffshrink");
		})
	;
