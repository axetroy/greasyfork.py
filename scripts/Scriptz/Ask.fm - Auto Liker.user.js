// ==UserScript==
// @name Ask.fm - Auto Liker
// @namespace http://scriptz.de.to/
// @description	Hit the 'L' Key
// @version	5.8.0.9
// @include	*://ask.fm/*
// @icon http://ask.fm/apple-touch-icon.png
// @author Scriptz
// @grant unsafeWindow
// @copyright 2013+ , Scriptz
// @noframes
// @supportURL mailto:scriptz@mail1a.de?subject=Ask.fm - Auto Liker
// @license Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License; http://creativecommons.org/licenses/by-nc-nd/3.0/
// ==/UserScript==

// ==Ads==
document.getElementsByClassName('askfm-ad-slot-side askfm-ad-slot-300x250 askfm-ad-slot loader')[0].innerHTML = '';
setInterval(function(){var values = ['<a href="http://www.npage.de/werben_scriptz.html" target="_blank"><img src="http://www.npage.de/banner/300x250-npage_02.gif" border=0></a>','<a href="http://www.npage.de/werben_scriptz.html" target="_blank"><img src="http://www.npage.de/banner/300x250-npage_01.gif" border=0></a>'],
    setads = values[Math.floor(Math.random() * values.length)];
                       document.getElementsByClassName('askfm-ad-slot-side askfm-ad-slot-300x250 askfm-ad-slot loader loaded')[0].innerHTML = setads;}, 10000);
// ==============

// ==LIKE==
document.onkeydown= openPage ;
function openPage(e) {
    e= window.event ? event : e;
    if (e.keyCode == 76 ) {
        var jslink = "javascript";
        var LIKE = document.getElementsByClassName("icon-like")[0].click();
        document.getElementsByClassName("icon-like")[1].click();
        document.getElementsByClassName("icon-like")[2].click();
        document.getElementsByClassName("icon-like")[3].click();
        document.getElementsByClassName("icon-like")[4].click();
        document.getElementsByClassName("icon-like")[5].click();
        document.getElementsByClassName("icon-like")[6].click();
        document.getElementsByClassName("icon-like")[7].click();
        document.getElementsByClassName("icon-like")[8].click();
        document.getElementsByClassName("icon-like")[9].click();
        document.getElementsByClassName("icon-like")[10].click();
        document.getElementsByClassName("icon-like")[11].click();
        document.getElementsByClassName("icon-like")[12].click();
        document.getElementsByClassName("icon-like")[13].click();
        document.getElementsByClassName("icon-like")[14].click();
        document.getElementsByClassName("icon-like")[15].click();
        document.getElementsByClassName("icon-like")[16].click();
        document.getElementsByClassName("icon-like")[17].click();
        document.getElementsByClassName("icon-like")[18].click();
        document.getElementsByClassName("icon-like")[19].click();
        document.getElementsByClassName("icon-like")[20].click();
        document.getElementsByClassName("icon-like")[21].click();
        document.getElementsByClassName("icon-like")[22].click();
        document.getElementsByClassName("icon-like")[23].click();
        document.getElementsByClassName("icon-like")[24].click();
        document.getElementsByClassName("icon-like")[25].click();
        window.location = jslink+":"+LIKE;
    }
}
// ==============