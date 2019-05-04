// ==UserScript==
// @name         twitter_full_tarih
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Bu script tweetlerdeki relative zamanı normal tarihe çevirir.
// @author       mustafayildizx@gmail.com
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==


$(document).ready(function() {
    basla();
});


function basla(){
    $(".js-relative-timestamp").each(function(){
        timestamp = $(this).attr("data-time");
        full_tarih = timeConverter(timestamp);
        yazilacaklar = " <span id='full_tarih' title='" + timestamp + "'>" + full_tarih + "</span>";

        $(this).parent().append(yazilacaklar);

    });
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var time = date + ' ' + month + ' ' + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


