// ==UserScript==
// @name        WWT - Subtitle download links to TV and Movie torrents
// @description  Adds download links for subtitles to every TV and movie torrent on WWT (addic7ed & subscene) 
// @namespace   NotNeo
// @include     http*://worldwidetorrents.to/torrents-details.php*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.2
// @grant       none
// ==/UserScript==

var torrentTitle;
var baseURL;

$(document).ready(function() {
  var catText = $(".category_id_bar").text();
  var cat = catText.split(">")[0];
  for (i=0;i<10;i++) {
    cat = cat.replace(" ", "");
  }
  
  if ( cat == "TV" ) {
    torrentTitle = $(".fltRight").prev().prev().text();
    baseURL = "http://www.addic7ed.com/search.php?search=";
    for (i=0;i<100;i++) {
      torrentTitle = torrentTitle.replace(" ", "+");
    }
    $(".glyphicon.glyphicon-download").parent().parent().parent().append(' <a href="' + baseURL + torrentTitle + '"><span class="btn btn-default"> <img src="http://addic7ed.com/favicon.ico" alt="Download subtitles for this torrent" height="16" width="16"> Download Subtitles</span></a> ')
  } else if ( cat == "Movies" ) {
    torrentTitle = $(".fltRight").prev().prev().text();
    baseURL = "https://subscene.com/subtitles/title?q=";
    for (i=0;i<100;i++) {
      torrentTitle = torrentTitle.replace(" ", "+");
    }
    $(".glyphicon.glyphicon-download").parent().parent().parent().append(' <a href="' + baseURL + torrentTitle + '"><span class="btn btn-default"> <img src="http://subscene.com/favicon.ico" alt="Download subtitles for this torrent" height="16" width="16"> Download Subtitles</span></a> ')
  }
});