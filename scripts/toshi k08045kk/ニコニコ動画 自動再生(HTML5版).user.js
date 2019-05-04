// ==UserScript==
// @name        ニコニコ動画 自動再生(HTML5版)
// @description ニコニコ動画を自動再生します。
// @include     http://www.nicovideo.jp/watch/*
// @include     https://www.nicovideo.jp/watch/*
// @author      toshi
// @license     MIT License
// @see         https://opensource.org/licenses/MIT
// @namespace   https://www.bugbugnow.net/
// @version     2
// @see         2 - Flash版を削除(Chromeで動作しないため)
// @see         1 - HTML5版に対応
// @grant       none
// ==/UserScript==
 
(function(){
  // 自動再生を試行する間隔(ms)
  var INTERVAL = 500;
 
  var btn = document.querySelector('.VideoStartButton');
  if (btn != null) {
    // HTML5版
    window.addEventListener('load', function(){
      setTimeout(function() {
        btn.click();
      }, INTERVAL);
    }, false);
  }
})();