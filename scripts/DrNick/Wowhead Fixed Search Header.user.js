// ==UserScript==
// @name         Wowhead Fixed Search Header
// @description  Makes the page header (the search box) "sticky" when you scroll.
// @namespace    drnick
// @include      *wowhead.com*
// @grant        none
// @version      1.1.5
// ==/UserScript==

(function() {

	if (typeof jQuery == "undefined") throw "jQuery not found";
	if (window.top != window.self) return;
	
	var $ = jQuery;
	
	var $window = $(window);
	var $header = $(".header-search");
	var $headerInput = $(".header-search input");
	
	if ($header.length == 0) throw "#header not found";
	
	var styles = [
		".header-search.sticky {",
			"position: fixed;",
			"top: 4px;",
			"right: 4px;",
			"z-index: 9999;",
			"width: 302px;",
			"box-shadow: 0 6px 8px #000;",
		"}",
		".header-search.sticky input {",
			"width: 260px;",
			"padding: 2px;",
			"margin-left: -22px;",
		"}",
		".header-search.sticky a {",
			"height: 26px;",
			"line-height: 26px;",
		"}",		
	].join("\n");
	
	$liveSearchStyle = $("<style type='text/css'></style");
	
	$("head").append("<style type='text/css'>" + styles + "</style>");
	$("head").append($liveSearchStyle);
	
	var offset = $header.offset().top;
	var height = $header.height();
	
	var $dummy = $header.clone();
	$dummy.empty();
	$dummy.attr("id", "header-dummy");
	$dummy.hide();
	
	$dummy.insertAfter($header);
	
	var liveSearchStyle = $liveSearchStyle.get(0);
	
	var isFloating = false;	
	var liveSearchLeft = 0;
	var liveSearchTop = 0;
	var liveSearchWidth = 0;
	var liveSearchPos = "absolute";
	
	$window.scroll(function() {
		var scrollTop = $window.scrollTop();
		var recalc = true;
		
		if (!isFloating && scrollTop > offset) {
			$header.addClass("sticky");
			$dummy.show();
			isFloating = true;
			liveSearchPos = "fixed";
			$(".beta-ptr-links").hide();
		}
		else if (isFloating && scrollTop <= offset) {
			$header.removeClass("sticky");
			$dummy.hide();
			isFloating = false;
			liveSearchPos = "absolute";
			$(".beta-ptr-links").show();
		}
		else
			recalc = false;
		
		if (recalc) {
			liveSearchLeft = $header.offset().left | 0;
			liveSearchTop = ($header.offset().top + $header.height()) | 0;
			liveSearchWidth = $headerInput.outerWidth() | 0;
			
			if (isFloating) liveSearchTop -= ($window.scrollTop() | 0);
			
			liveSearchStyle.innerHTML = ".live-search { position:" + liveSearchPos + "; top: " + liveSearchTop + "px !important; " +
			"left: " + liveSearchLeft + "px !important; " + 
			"width: " + liveSearchWidth + "px !important; }";
		}
	});
	
	$window.trigger('scroll');
	
})();