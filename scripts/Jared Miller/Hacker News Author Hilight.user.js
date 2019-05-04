// ==UserScript==
// @name        Hacker News Author Hilight
// @namespace   http://cantcode.com
// @description Makes the author name more apparent when scrolling through comments.
// @include     https://news.ycombinator.com/item?id=*
// @include     http://news.ycombinator.com/item?id=*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.4
// ==/UserScript==

var backgroundColor = '#8000FF';
var foregroundColor = '#fff';
var newUserForegroundColor = '#00FF00';

// identify who the author is
var author = $('table .subtext').find('a').eq(0).text();
var authorElement = $('.comhead a[href="user?id=' + author + '"]');

// change the color of the author
authorElement.css({
    'background-color': backgroundColor,
    'color': foregroundColor,
    'padding': '1px 2px',
    'border-radius': '3px'
});

// if a new user, do something about the ugly green on orange
if (authorElement.find("font").length) {
    authorElement.find("font").attr("color", newUserForegroundColor);
}