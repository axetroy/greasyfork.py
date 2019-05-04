// ==UserScript==
// @name        FIMFiction - Mark all read/unread
// @namespace   Selbi
// @include     http*://fimfiction.net/story/*
// @include     http*://www.fimfiction.net/story/*
// @version     1.1
// @require     http://code.jquery.com/jquery-1.11.0.min.js
// @description Adds two buttons to mark all chapters of a story as read or unread.
// ==/UserScript==

var alluls = document.getElementsByTagName('ul');
var readstax = [];
var chapterstotal = 0;

var MarkAllUnread = $('<a href="javascript:void();">Unread</a>');
var MarkAllRead = $('<a href="javascript:void();">Read</a>');


for (var int=0; int<alluls.length; int++) {
	if (alluls[int].className == "chapters") {
		readstatus = alluls[int].getElementsByTagName('img');
		var span = $('<span style="margin-left:20px;font-size:80%;font-style:italic;text-align:right;">Mark all: </span>').append(MarkAllUnread).append(' / ').append(MarkAllRead).append('</span>');
		$("." + alluls[int].className).before(span);
	}
}
$(".chapter-read-icon").each(function() {
	if ($(this).hasClass("chapter-read")) {
		readstax[chapterstotal] = true;
		chapterstotal++;
	} else {
		readstax[chapterstotal] = false;
		chapterstotal++;
	}
});
MarkAllUnread.click(function() {
	for (int=0;int<chapterstotal;int++) {
		if (readstax[int] == true) {
			var regex = /[ ]+\d+[ ]+/g;
			var matches = $(".chapters").html().toString().match(regex);
			unsafeWindow.ToggleRead(parseInt(matches[int]));
		}
	}
});

MarkAllRead.click(function() {
	for (int=0;int<chapterstotal;int++) {
		if (readstax[int] == false) {
			var regex = /[ ]+\d+[ ]+/g;
			var matches = $(".chapters").html().toString().match(regex);
			unsafeWindow.ToggleRead(parseInt(matches[int]));
		}
	}
});