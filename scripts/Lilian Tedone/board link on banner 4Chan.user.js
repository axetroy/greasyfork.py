// ==UserScript==
// @name         board link on banner 4Chan
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a link to the current board on the banner (on top) on 4chan.
// @author       BeardDesign
// @match        https://boards.4chan.org/*
// @grant        none
// @require http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

var UrlPathname = window.location.pathname;
var Board = UrlPathname.split('/')[1];
jQuery.fn.outerHTML = function(s) {
    return (s) ? this.before(s).remove(): jQuery("<p>").append(this.eq(0).clone()).html();
};
var fullUrl = "https://boards.4chan.org/" + Board;
var bannerhtml = $(".boardBanner").outerHTML();
$(".boardBanner").replaceWith('<a href="' + fullUrl + '">' + bannerhtml + '</a>');