// ==UserScript==
// @name        MusictonicでVideo Speed Controller等のショートカットキーを効くようにする
// @name:en     Focuses on video every 500ms in Musictonic to enable shortcut keys of Video Speed Controller etc.
// @description 500ミリ秒ごとにビデオのあるiframeにフォーカスします
// @description:en the video always takes the focus so you can not operate with only the keyboard.
// @match       *://musictonic.com/music/*
// @version     0.2
// @grant none
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {
  eleget0('//input[@id="q" and @name="q"]').value = eleget0('//h1[@class="artist"]').innerText.replace(/ Music Videos/, "")+" ";

  setInterval(function(e) {
    if (document.activeElement != document.body && document.activeElement != null && /input|textarea/i.test(document.activeElement.tagName)) return; //入力フォームなら戻る
    if (window.getSelection() != "") return; //選択文字列がある
    if (/BODY|A/i.test(document.activeElement.tagName)) {
      var ele = document.getElementById("player_container");
      if (ele) {
        ele.tabIndex = 0;
        ele.focus();
      }
    }
  }, 500);
  return;

  function eleget0(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
  }

})();
