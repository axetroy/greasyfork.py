// ==UserScript==
// @name           Videos autoplay off on jeanmarcmorandini.com 
// @namespace      https://greasyfork.org/fr/users/5295-guile93
// @description    Désactive la lecture automatique des vidéos (dailymotion) sur jeanmarcmorandini.com 
// @include        *www.jeanmarcmorandini.com/*
// @include        *http://www.morandinisante.com/*
// @author        Guile93
 // @version        0.3
// @lastupdated    2016-06-03
// ==/UserScript==
var nbFrames=document.getElementsByTagName("iframe");
var re = new RegExp("http:\/\/.*dailymotion\.com\/embed\/video\/([^(\&|$.%)]*)");
for (i = 0; i < nbFrames.length; i++) {
    var Elem=nbFrames[i];
    if(Elem.src.match(re)){
      var parts = Elem.src.split(re);
      var videoID = parts[1].split("?")[0];
      var link = 'http://www.dailymotion.com/embed/video/' + videoID + "?autoPlay=0";
      Elem.setAttribute("src", link);
    }
}