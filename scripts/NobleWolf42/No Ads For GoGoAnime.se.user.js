// ==UserScript==
// @name         No Ads For GoGoAnime.se
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  Removes some ads on gogoanime.se
// @author       NobleWolf42
// @match        https://www1.gogoanime.se/*
// @grant        none
// ==/UserScript==

$('.banner_center').remove();
