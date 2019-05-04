// ==UserScript==
// @name        ニコニコ動画HTML5 コメント非表示
// @namespace   ncode
// @include     http://www.nicovideo.jp/watch/*
// @include     https://www.nicovideo.jp/watch/*
// @version     2
// @description ニコニコ動画のHTML5版プレイヤーのコメントをデフォルトで非表示にするスクリプトです
// @grant       none
// ==/UserScript==
(function(){
    var timer = setInterval(function() {
        try {
            var buttons = document.getElementsByClassName('CommentOnOffButton');
            if(!buttons) return;
            buttons.item(0).click();
            clearInterval(timer);
        } catch(e) {
        }
    }, 300);
})();