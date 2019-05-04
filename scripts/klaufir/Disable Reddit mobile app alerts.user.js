// ==UserScript==
// @name        Disable Reddit mobile app alerts
// @description Removes Reddit mobile app nagging
// @encoding    utf-8
// @namespace   fix_reddit_mobile
// @include     htt*://www.reddit.com/*
// @grant       none
// @version 0.0.1.20181024123512
// ==/UserScript==

var optOuts = JSON.parse(localStorage.getItem("optOuts")) || {};

if (optOuts.xpromoInterstitialMenu != true){
    optOuts.xpromoInterstitialMenu = true;
    localStorage.setItem("optOuts", JSON.stringify(optOuts));
}
