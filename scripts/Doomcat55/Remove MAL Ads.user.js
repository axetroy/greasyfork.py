// ==UserScript==
// @name         Remove MAL Ads
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @description  Hides specific ads on MyAnimeList.net
// @author       Doomcat55
// @match        https://myanimelist.net/*
// ==/UserScript==

var headerAd = document.getElementsByClassName('banner-header-anime-straming')[0];
headerAd.parentNode.removeChild(headerAd);

var malAds = document.getElementsByClassName('_unit');
for (i = 0; i < malAds.length; i++) {
    malAds[i].style.display = 'none';
}