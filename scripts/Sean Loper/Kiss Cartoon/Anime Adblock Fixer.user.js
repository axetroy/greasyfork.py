// ==UserScript==
// @name         Kiss Cartoon/Anime Adblock Fixer
// @namespace    https://twitter.com/Grimmdev
// @version      1.0
// @description  Kiss Cartoon/Anime doesn't like adblock, so we fix that and make them like it!
// @author       Sean Loper
// @match        http://kissanime.com/*
// @match        http://kisscartoon.me/*
// @grant        none
// ==/UserScript==

isBlockAds2 = false;
isBlockAds = false;

$(function () {
    setTimeout(FixBlock(), 1000);
});

function FixBlock()
{
    isBlockAds = false;
    isBlockAds2 = false;
}