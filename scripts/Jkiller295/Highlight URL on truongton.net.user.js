// ==UserScript==
// @name         Highlight URL on truongton.net
// @namespace    http://truongton.net
// @version      0.4
// @description  Script này sẽ đổi màu các link trong bài viết và chữ ký để tiện cho MOD quản lý
// @author       Jkiller295
// @require 	http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @include 	http://www.truongton.net/forum/showthread.php*
// @include     http://www.truongton.net/forum/showpost.php*
// @include 	http://truongton.net/forum/showthread.php*
// @include     http://truongton.net/forum/showpost.php*
// ==/UserScript==


$("[class^='post-message'] a").each(function()
{
    $(this).css("background-color","yellow").css("color","red");
});