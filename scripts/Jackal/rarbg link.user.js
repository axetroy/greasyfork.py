// ==UserScript==
// @name        rarbg link
// @namespace   localhost
// @include     http://rarbg.to/*
// @include     https://rarbg.to/*
// @require     http://code.jquery.com/jquery-3.2.1.min.js
// @version     1.0
// @grant       none
// @description	Add magnet links
// ==/UserScript==
jQuery3 = $.noConflict(true);
console.log(jQuery3.fn.jquery)

jQuery3('td.lista').find('a[href^="/torrent/"][title]').each(function(index){
  id = jQuery3(this).attr('href').match(/torrent\/(.+?)$/)[1];
  href = "http://rarbg.to/download.php?id="+id+"&f="+jQuery3(this).attr('title')+"-[rarbg.com].torrent";
  rt = "https://rtorrent:admin@jackal-nas:6008/ui/rtorrent/php/addtorrent.php?url="+encodeURIComponent(href);
  scp = jQuery3("<a href='"+href+"'><img src='https://dyncdn.me/static/20/img/16x16/download.png'></a>").css("cursor","pointer");
  jQuery3(this).before(scp)
});

// Remove Ads
jQuery3("tr.lista2:contains('1click')").add("tr.lista2:contains('wpick')").remove();
jQuery3("a[href*='wd_adpub']").parent().parent().remove();
