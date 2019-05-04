// ==UserScript==
// @name        ニコニコ動画 動画視聴モード
// @description HTML5とFlash切換えバーをページ下部へ移動する。
// @description 動画を上部に移動する動画視聴モードに切換える。
// @include     http://www.nicovideo.jp/watch/*
// @include     https://www.nicovideo.jp/watch/*
// @author      toshi
// @license     MIT License
// @see         https://opensource.org/licenses/MIT
// @namespace   https://www.bugbugnow.net/
// @version     3.1
// @see         3.1 - https対応
// @see         3 - 動画部のクリックで再生/停止制御を追加
// @see         2 - ニコニコ動画のHTML5/Flash版で視聴するバーを移動を追加
// @see         1 - 初版
// @grant       none
// ==/UserScript==

// HTML5とFlash切換えバーをページ下部へ移動する。
(function () {
  // Flash版
  var flash = document.querySelector('.html5_message');
  var footer = document.querySelector('#footer');
  if (flash && footer) {
    flash.style.margin = '0px';
    footer.insertAdjacentElement('beforebegin', flash);
  }
  // HTML5版
  var html = document.querySelector('.SwitchToFlashLead');
  var footer = document.querySelector('.FooterContainer');
  if (html && footer) {
    footer.style.marginTop = '0px';
    footer.insertAdjacentElement('beforebegin', html);
  }
})();

// 動画視聴モードへ移行
// 上部のメニューバーをクリックで通常/動画モード切換える
(function () {
  var header  = document.querySelector('#siteHeader');
  var header2  = document.querySelector('#siteHeaderInner');
  header.addEventListener('click', function (event) {
    // 上部の黒いバーの時(リンクを除く)
    if (event.target === header || event.target === header2) {
      var player = null;
      if ((player=document.querySelector('#playerContainerWrapper')) != null) {
        // Flash版
        if (document.querySelector('.videoMode') == null) {
          document.querySelector('#content').insertAdjacentElement('afterbegin', player);
          player.classList.add('videoMode');
        } else {
          document.querySelector('#enquete-placeholder').insertAdjacentElement('beforebegin', player);
          player.classList.remove('videoMode');
        }
      } else if ((player=document.querySelector('.MainContainer')) != null) {
        // HTML5版
        if (document.querySelector('.videoMode') == null) {
          document.querySelector('.WatchAppContainer-main').insertAdjacentElement('afterbegin', player);
          player.classList.add('videoMode');
        } else {
          document.querySelector('.HeaderContainer').insertAdjacentElement('afterend', player);
          player.classList.remove('videoMode');
        }
      }
    }
  }, false);
  
  // 動画モードへ移行
  header.click();
})();

// 動画のクリックで再生/停止
(function () {
  window.addEventListener("load", function(){
    var player = document.querySelector('#VideoPlayer');
    if (player != null) {
      player.addEventListener('click', function() {
        var play = document.querySelector('.ActionButton.ControllerButton.PlayerPlayButton');
        var stop = document.querySelector('.ActionButton.ControllerButton.PlayerPauseButton');
        if (play != null) {
          play.click();
        } else if (stop != null) {
          stop.click();
        }
      });
    }
  }, false);
})();