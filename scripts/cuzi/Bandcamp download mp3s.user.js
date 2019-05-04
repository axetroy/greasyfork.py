// ==UserScript==
// @name        Bandcamp download mp3s
// @description Shows download links for the preview files on bandcamp albums
// @namespace   cuzi
// @oujs:author cuzi
// @homepageURL https://openuserjs.org/scripts/cuzi/Bandcamp_download_mp3s
// @version     4
// @license     GPL-3.0
// @include     https://*.bandcamp.com/*
// @grant       none
// ==/UserScript==
(function() {
  if(TralbumData && TralbumData.hasAudio && !TralbumData.freeDownloadPage && TralbumData.trackinfo) {
    var i = 1;
    var div = document.createElement("div");
    document.body.appendChild(div);
    TralbumData.trackinfo.forEach(function(t) {
      for (var prop in t.file) {
        var mp3 = t.file[prop].replace(/^\/\//,"http://");
        var a = document.createElement("a");
        a.href = mp3;
        a.appendChild(document.createTextNode(mp3));
        div.appendChild(document.createTextNode(i+++" "+prop+":"));
        div.appendChild(a);
        div.appendChild(document.createElement("br"));
      }
    });
    div.addEventListener("mouseover",function() {
      div.setAttribute("style","position:absolute;top:10px;left:5px;padding:50px;background:Midnightblue;color:white;z-index:10");
    });
    div.addEventListener("mouseout",function() {
      div.setAttribute("style","");
    });
  }
})();

/*
    // Insert links into track list
    window.setTimeout(function() {
      if(TralbumData && TralbumData.hasAudio && !TralbumData.freeDownloadPage && TralbumData.trackinfo) {
        var i = 0;
        var hoverdiv = document.querySelectorAll(".download-col div");
        TralbumData.trackinfo.forEach(function(t) {
          for (var prop in t.file) {
            var mp3 = t.file[prop].replace(/^\/\//,"http://");
            var a = document.createElement("a");
            a.href = mp3;
            a.appendChild(document.createTextNode(prop));
            hoverdiv[i++].appendChild(a);
            break;
          }
        });
      }
    },200);
*/