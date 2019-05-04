// ==UserScript==
// @name        ZhuiXinFan Magnet Link
// @namespace   localhost
// @include     http://www.zhuixinfan.com/main.php?mod=viewresource*
// @version     1
// @require     http://code.jquery.com/jquery-3.2.1.min.js
// @grant       none
// @description:en Convert ZhuiXinFan magnet link to clickable
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
html = $("#torrent_url").html();
$("#torrent_url").replaceWith("<a href='"+html+"' class='a1'>"+html+"</a>");