// ==UserScript==
// @name        FIMFiction - Hide Comments
// @namespace   Selbi
// @include     http*://*fimfiction.net/story/*/*/*
// @exclude     http*://*fimfiction.net/story/*/*comment/*
// @include     http*://*fimfiction.net/chapter/*
// @description Hides comments on story pages.
// @version     1.1
// ==/UserScript==

bottom = $(".chapter-bottom");
bottom.hide().before('<div class="message" style="margin-top:30px;text-align:center;"><a href="javascript:void()" id="showComments"><i>Toggle Comments</i></a></div>');

$("#showComments").click(function(){
	bottom.is(":visible") ? bottom.hide() : bottom.show();
});