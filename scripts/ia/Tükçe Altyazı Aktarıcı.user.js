// ==UserScript==
// @name        Tükçe Altyazı Aktarıcı
// @namespace   https://openuserjs.org/
// @version     1.0
// @description IMDb sayfasına buton ekler.
// @icon        http://www.turkcealtyazi.org/images/favicon.ico
// @author      ia5634
// @include     http://www.imdb.com/title/tt*
// @include     https://www.imdb.com/title/tt*
// ==/UserScript==

$(function() {
   var imdbid = $("meta[property='pageId']").attr('content');

   $("body").append('<a id="isoisoiso" href="http://www.turkcealtyazi.org/find.php?cat=sub&find="> <img id="resim" src="http://www.turkcealtyazi.org/images/favicon.ico">');
   $("#resim").css({position:"fixed", width:"25px", height:"25px", top:"0", left:"0"});

   $("#isoisoiso").attr("href", "http://www.turkcealtyazi.org/find.php?cat=sub&find=" + imdbid);
});
