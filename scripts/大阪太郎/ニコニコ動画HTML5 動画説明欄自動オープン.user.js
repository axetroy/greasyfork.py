// ==UserScript==
// @name        ニコニコ動画HTML5 動画説明欄自動オープン
// @namespace   ncode
// @include     http://www.nicovideo.jp/watch/*
// @include     https://www.nicovideo.jp/watch/*
// @version     2
// @description ニコニコ動画のHTML5版プレイヤーの動画説明欄を自動的にオープンします
// @grant       none
// ==/UserScript==
(function(){
  var counter = 0;
  var timer = setInterval(function() {
    counter++;
    if (counter > 10) {
      clearInterval(timer);
      return;
    }
    try {
      var buttons = document.getElementsByClassName('VideoDescriptionExpander-buttonExpand');
      if(!buttons) return;
      buttons.item(0).click();
      clearInterval(timer);
    } catch(e) {
    }
  }, 300);
})();