// ==UserScript==
// @name        TmBox 自動再生無効化
// @namespace   xyz.qpwakaba.tmbox.NoAutoStart
// @description TmBoxの自動再生を無効にする
// @include     https://tmbox.net/pl/*
// @version     1
// @grant       none
// ==/UserScript==

var TARGET = document.getElementById('play-audio-tag');
TARGET.autoplay = false;
TARGET.addEventListener('loadedmetadata', function () {
    TARGET.pause();
});

