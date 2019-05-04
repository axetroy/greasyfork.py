// ==UserScript==
// @name         ピクトセンス - 不要なボタンや広告を隠す
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  不要なボタンを隠します。
// @author       You
// @match        https://pictsense.com/*
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
    const hide = (_elm) => {
        if(_elm == null)return 0;
        _elm.style.display ='none';
    }

    const hide_all = (_elms) => {
        if(_elms == null)return 0;
        for(let i=0;i<_elms.length;i++)hide(_elms[i]);
    }

    hide(document.getElementById("messageScrollModeSelect"));
    hide(document.getElementById("roomDataButton"));
    hide(document.getElementById("tweetButton"));
    hide(document.getElementById("lineButton"));
    hide(document.getElementById("headerAd"));
    hide(document.getElementById("rightAd"));
    hide(document.getElementById("footerAd"));
    hide_all(document.getElementsByClassName("switch"));

})();