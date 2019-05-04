// ==UserScript==
// @name        1337X - Subtitle download links to TV and Movie torrents
// @description  Adds download links for subtitles to every TV and movie torrent on 1337x (addic7ed & subscene)
// @namespace   NotNeo
// @icon        https://i.imgur.com/osa4FfN.png
// @include     http*://1337x.to/torrent/*
// @include     http*://1337x.st/torrent/*
// @include     http*://1337x.ws/torrent/*
// @include     http*://1337x.eu/torrent/*
// @include     http*://1337x.se/torrent/*
// @include     http*://1337x.is/torrent/*
// @version     2.1.6
// @grant       none
// ==/UserScript==

setTimeout(function() {

    var cat = document.querySelectorAll(".list")[1].firstElementChild.lastElementChild.innerHTML;

    if ( cat == "TV" ) {
        var torrentTitle = document.querySelectorAll("h1")[0].textContent;
        var baseURL = "http://www.addic7ed.com/search.php?search=";
        var place = document.querySelectorAll(".download-links-dontblock.btn-wrap-list")[0];
        var subLi = document.createElement("li");
        var mouseOverIn = "this.style.backgroundColor = '#396a93';";
        var mouseOutIn = "this.style.backgroundColor = '#4682b4';";
        subLi.innerHTML = '<li class="subDownL"><a class="btn btn-magnet" style="border-radius: 3px; padding: 4px 4px 4px 50px; font-size: 15px; width: 100%; font-family: Oswald Bold,sans-serif; text-transform: uppercase; background-color:SteelBlue" onMouseOver="' + mouseOverIn + '" onMouseOut="' + mouseOutIn + '" href="' + baseURL + torrentTitle + '"><span><i><img src="http://addic7ed.com/favicon.ico" style="float: left; margin-left: -40px;" alt="Download subtitles for this torrent" height="20" width="20"></i></span>  Subtitle Download</a> </li>';
        place.appendChild(subLi);
    }else if ( cat == "Movies" ) {
        var torrentTitle = document.querySelectorAll("h1")[0].textContent;
        var baseURL = "https://subscene.com/subtitles/title?q=";
        var place = document.querySelectorAll("ul.download-links-dontblock.btn-wrap-list")[0];
        var subLi = document.createElement("li");
        var mouseOverIn = "this.style.backgroundColor = '#396a93';";
        var mouseOutIn = "this.style.backgroundColor = '#4682b4';";
        subLi.innerHTML = '<li class="subDownL"><a class="btn btn-magnet" style="border-radius: 3px; padding: 4px 4px 4px 50px; font-size: 15px; width: 100%; font-family: Oswald Bold,sans-serif; text-transform: uppercase; background-color:SteelBlue" onMouseOver="' + mouseOverIn + '" onMouseOut="' + mouseOutIn + '" href="' + baseURL + torrentTitle + '"><span><i><img src="http://subscene.com/favicon.ico" style="float: left; margin-left: -40px;" alt="Download subtitles for this torrent" height="20" width="20"></i></span>  Subtitle Download</a> </li>';
        place.appendChild(subLi);
    }

}, 100);