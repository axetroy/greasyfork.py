// ==UserScript==
// @name         for btkitty
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @include      http://btkitty.bid/*
// @grant        none
// @require      https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js
// ==/UserScript==

(function () {
	var a = $('.down>span>a')[0];
    var href = a.href;
    
    var iframe = '<iframe id="iframe" src="' + href + '" width="700" height="500" > </iframe>';
    $('.content').prepend(iframe);
    //$('.content').insertAdjacentHTML("afterBegin",iframe);
}) ();