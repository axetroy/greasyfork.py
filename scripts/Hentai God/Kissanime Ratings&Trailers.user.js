// ==UserScript==
// @name         Kissanime Ratings&Trailers
// @namespace    http://cl.1ck.me
// @version      1.3.3
// @description  Displays MAL-ratings and Trailers for each anime on Kissanime
// @author       Thorus111
// @match        *://kissanime.ru/*
// ==/UserScript==
/* jshint -W097 */
'use strict';

var titles = document.getElementsByClassName("title");

for(var i = 0; i < titles.length; i++) {

    var title = titles[i].innerHTML;
    if(title !== "Remove Ads") {
    title = title.replace(' (Dub)','');
    title = title.replace(' (Sub)','');
    title = title.replace('(Dub)','');
    title = title.replace('(Sub)','');
    title = title.replace('                            ','');
    title = title.replace('                          ','');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');

    var IFrame = document.createElement("IFRAME");
    IFrame.src = 'https://cl.1ck.me/projects/reviews/index.php?an='+encodeURIComponent(title);
    IFrame.setAttribute("style", "width: 280px; height: 35px; overflow: hidden; margin-bottom:-20px;");
    IFrame.style.backgroundColor = "transparent";
    IFrame.frameBorder = "0";
    IFrame.allowTransparency="true";
    titles[i].appendChild(IFrame);
    }
    
}

var bigtitles = document.getElementsByClassName("bigChar");
var aniUrl = "http://kissanime.ru/Anime/";

for(var i = 0; i < bigtitles.length; i++) {

    var title = bigtitles[i].innerHTML;
    title = title.replace(' (Dub)','');
    title = title.replace(' (Sub)','');
    title = title.replace('(Dub)','');
    title = title.replace('(Sub)','');
    title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');
        title = title.replace(' ','-');

    var IFrame = document.createElement("IFRAME");
    IFrame.src = 'https://cl.1ck.me/projects/reviews/index.php?an='+encodeURIComponent(title);
    IFrame.setAttribute("style", "width: 280px; height: 35px; overflow: hidden;");
    IFrame.style.backgroundColor = "transparent";
    IFrame.frameBorder = "0";
    IFrame.allowTransparency="true";
    bigtitles[i].innerHTML += "<br>";
    bigtitles[i].appendChild(IFrame);
    
    if(window.location.href.substring(0, aniUrl.length) == aniUrl) {
var trailer = document.getElementsByClassName("barContent")[0];

trailer.innerHTML += "<br><br><span class='info'>Trailers:</span><br><iframe src='https://cl.1ck.me/projects/reviews/index.php?an="+encodeURIComponent(title)+"&trailers=true' height=200px width=100% style='border:none;' allowfullscreen></iframe>";
    }
    
}


