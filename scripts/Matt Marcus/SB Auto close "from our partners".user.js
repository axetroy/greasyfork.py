// ==UserScript==
// @name         SB Auto close "from our partners"
// @description  Closes that shitty little "From Our Partners" thing
// @include      http://www.swagbucks.com/*
// @author       Mattwmaster58
// @version      1.6
// @icon         https://pichoster.net/images/2017/03/11/6832b44dc990d3deea52ce1b2592a13b.png
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @license      MIT
// @namespace https://greasyfork.org/users/107214
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function () {
	setTimeout(function () {
		while ($('#sbCompanionClose').length > 0) {

			$("#vdb_01783a7c-03df-41c1-b541-9fb2732df92d").remove();
			$("#sbCompanionAdsList").remove();
			$("#58cab4e24d96935d7d544779").remove();
			$("#58cfee52f78ced6518e9297c").remove();
			$("#AolHtml5Player").remove();
			$(".vdb_player").remove();
			$("#sbCompanionHeadCont").remove();
			$("#companionInner").paren().eq(0).empty()
		}
		while ($(".sbVisuallyHidden").length > 0) {
            $(".sbVisuallyHidden").remove();
			/*$(".sbCompanionHeader").remove();
			$(".sbCompanionHeadCont").remove();
			$("#sbCompanionAdsList").remove();*/
			$("#companionWrapper").empty();
		}
	}, 150);
});
