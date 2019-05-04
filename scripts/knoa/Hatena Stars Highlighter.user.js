// ==UserScript==
// @name        Hatena Stars Highlighter
// @namespace   knoa.jp
// @description はてなスターの数に応じてブコメをハイライトさせます。
// @include     http*://b.hatena.ne.jp/entry/*
// @version     1
// @grant       none
// ==/UserScript==

/*
トップ10に限定されるのがもったいないので
トップ11以降も状況に応じた数だけ表示させたい
「新しいブコメなのにスターを集めている」のも新タブか何かで目立たせたい
*/

(function () {
  let as, i;
  // ついでに一仕事
  // サイト内ブクマリストを人気順にする。
  if (as = document.querySelectorAll('.entry-info-domain a')) {
    for (i = 0; i < as.length; i++) {
      as[i].href = as[i].href + '&sort=count';
    }
  }
  // ここから本作業
  // グリモン起動のほうが早いので、addEventListener('load')にしないとダメっぽい
  window.addEventListener('load', function () {
    let spans, i;
    // 頻発するMutationObserverよりsetIntervalのほうがマシということで。
    // スターサーバーが遅いことも多々ある。よってIntervalでよい。
    // *一度確認したらフラグ立てる方式は読み込み遅延やコンテナが開かれたときに注意が必要
    let timer = window.setInterval(function () {
      spans = document.querySelectorAll('span.hatena-star-star-container');
      for (i = 0; spans && spans[i]; i++) {
        switch(true){
          case (32 <= spans[i].getElementsByTagName('a').length):
            spans[i].parentNode.parentNode.parentNode.style.background = '#ffff00';
            break;
          case (16 <= spans[i].getElementsByTagName('a').length):
            spans[i].parentNode.parentNode.parentNode.style.background = '#ffff80';
            break;
          case (8 <= spans[i].getElementsByTagName('a').length):
            spans[i].parentNode.parentNode.parentNode.style.background = '#ffffc0';
            break;
          case (4 <= spans[i].getElementsByTagName('a').length):
            spans[i].parentNode.parentNode.parentNode.style.background = '#ffffe0';
            break;
          case (2 <= spans[i].getElementsByTagName('a').length):
            spans[i].parentNode.parentNode.parentNode.style.background = '#fffff0';
            break;
        }
      }
      /* 16スター以上のまとまり */
      spans = document.querySelectorAll('span.hatena-star-inner-count'); //16<
      for (i = 0; spans && spans[i]; i++) {
        switch(true){
          case (32 <= spans[i].textContent):
            spans[i].parentNode.parentNode.parentNode.parentNode.style.background = '#ffff00';
            break;
          default:
            spans[i].parentNode.parentNode.parentNode.parentNode.style.background = '#ffff80';
            break;
        }
      }
    }, 1000);
  });
}) ();
