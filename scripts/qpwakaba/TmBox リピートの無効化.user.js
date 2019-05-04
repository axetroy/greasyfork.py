// ==UserScript==
// @name        TmBox リピートの無効化
// @namespace   xyz.qpwakaba.tmbox.NoRepeart
// @include     https://tmbox.net/pl/*
// @version     1
// @grant       none
// @description TmBoxのリピート機能を無効化する
// ==/UserScript==

var TARGET = document.getElementById('play-audio-tag');
TARGET.addEventListener('ended', function() {TARGET.pause();});
$('.js-plus-repeart')[0].action = "";