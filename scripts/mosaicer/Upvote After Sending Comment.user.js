// ==UserScript==
// @name        Upvote After Sending Comment
// @namespace   https://github.com/mosaicer
// @version     1.0
// @description click upvote button automatically after sending comment
// @author      mosaicer
// @match       https://*.reddit.com/r/lowlevelaware/comments/*
// run-at       document-idle
// @grant       none
// ==/UserScript==

(function() {
  'use strict';

  document.addEventListener('click', function (e) {
    var bottomArea, thing, uvBtn;

    // 保存ボタンじゃなければ何もしない
    if (e.target.className !== 'save') {
      return;
    }

    // テキストエリアが空であればコメントを送信できないので何もしない
    bottomArea = e.target.parentNode.parentNode;
    if (!bottomArea.previousSibling.children[0].value) {
      return;
    }

    // 編集の際はvalueプロパティがないので何もしない（編集ではUVしない）
    thing = bottomArea.parentNode.previousSibling.value;
    if (!thing) {
      return;
    }

    // 何に対するコメントかで場合分けしてUVボタンを取得
    uvBtn = thing.lastIndexOf('t1', 0) === 0 ?
      document.getElementById('thing_' + thing).children[1].children[0] :
      document.getElementById('thing_' + thing).children[2].children[0];

    // UVされていなければUVボタンをクリック
    if(!uvBtn.classList.contains('upmod')) {
      uvBtn.click();
    }
  }, false);
})();