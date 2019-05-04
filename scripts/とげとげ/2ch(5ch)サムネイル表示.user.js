// ==UserScript==
// @name         2ch(5ch)サムネイル表示
// @namespace    http://tampermonkey.net/
// @version      0.94
// @description  2(5)ちゃんねるに貼られている画像のサムネイルを表示します。
// @author       Togetoge
// @match        http://*.2ch.net/*
// @match        https://*.2ch.net/*
// @match        http://*.5ch.net/*
// @match        https://*.5ch.net/*
// @match        http://*.2ch.sc/*
// @match        https://*.2ch.sc/*
// @match        http://*.bbspink.com/*
// @match        https://*.bbspink.com/*
// @match        http://open2ch.net/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// ==/UserScript==

$(function(){
  $('a').each(function(){
    var address = $(this).text();
    var end = address.substr(address.length-3);
     if(end=="jpg" || end=="png" || end=="gif" || end=="bmp" || end=="rge" || end=="rig"){
    $(this).after($('</br><a href='+address+' target="_blank"><img src='+address+' width=400/></a></br>'));
    }
  });

 $(".thumb_i").each(function(){
     $(this).hide();
  });

})(jQuery);
