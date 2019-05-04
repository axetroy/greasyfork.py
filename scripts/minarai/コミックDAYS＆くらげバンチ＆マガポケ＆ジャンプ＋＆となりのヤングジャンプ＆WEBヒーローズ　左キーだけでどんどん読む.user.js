// ==UserScript==
// @name コミックDAYS＆くらげバンチ＆マガポケ＆ジャンプ＋＆となりのヤングジャンプ＆WEBヒーローズ　左キーだけでどんどん読む
// @description 「次の話を読む」や「この作品の無料公開中の話へ」ボタンが出た時に左キーでそれをクリックします　Enterで最新話に移動　fや[で全画面化
// @match *://comic-days.com/episode/*
// @match *://kuragebunch.com/episode/*
// @match *://pocket.shonenmagazine.com/episode/*
// @match *://shonenjumpplus.com/episode/*
// @match *://tonarinoyj.jp/episode/*
// @match *://viewer.heros-web.com/episode/*
// @run-at document-idle
// @grant GM_addStyle
// @version 0.5
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {

  const KeyNextReadableEpisode = "ArrowLeft";
  const KeyLatestReadableEpisode = "Enter";
  const KeyFullScreen1 = "[";
  const KeyFullScreen2 = "f";

  GM_addStyle(":focus { box-shadow: 0px 0px 10px 10px rgba(0, 250, 0, 0.5), inset 0 0 100px rgba(0, 250, 0, 0.2) !important; outline: rgba(0, 250,0,0.7) solid 4px !important; outline-offset: 1px !important; }")

  setTimeout(() => { var ele = eleget0('//section[@class="read-more-container"]/button'); if (ele) ele.click(); }, 100);

  var nextl = '//div[@class="viewer-colophon-info-wrapper"]/div[@class="viewer-colophon-info"]/p[@class="viewer-colophon-next-episode"]/a[@class="next-link test-back-matter-next-link"]|//a[@class="next-episode-free-link common-button"]|//a[@class="next-open-link"]';
  var ele = eleget0(nextl);
  if (ele) ele.innerText += " (←)";

  var lastl = '//div[@class="js-readable-product-list"]/div[1]/ul[1]/li[1]/a/div/h4|//div[@class="js-readable-product-list"]/ul[1]/li[1]/a/div/h4';
  var lastl2 = '//span[@class="test-readable-product-is-free series-episode-list-is-free"]'
  var ele = eleget0(lastl2) || eleget0(lastl);
  if (ele) ele.innerText += " (Enter)";

  document.addEventListener('keydown', function(e) {
    if (/input|textarea/i.test(e.target.tagName) == false) {
      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && !e.getModifierState("Shift") && e.key === KeyNextReadableEpisode) { // 左キー
        var ele = eleget0(nextl);
        if (isinscreen(ele)) {
          ele.click();
          ele.focus();
          ele.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
      }

      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && !e.getModifierState("Shift") && e.key === KeyLatestReadableEpisode) { // Enterキー
        var ele = eleget0(lastl2) || eleget0(lastl);
        if (ele) {
          ele.parentNode.parentNode.click();
          ele.parentNode.parentNode.focus();
          ele.parentNode.parentNode.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
      }

      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && !e.getModifierState("Shift") && (e.key === KeyFullScreen1 || e.key === KeyFullScreen2)) { // f [ 全画面化
        var y = window.pageYOffset;
        var doc = window.document;
        var docEl = doc.documentElement;
        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
          requestFullScreen.call(docEl);
        } else { cancelFullScreen.call(doc); }
        setTimeout(window.scroll, 100, 0, y);
      }
    }
  }, false);
  return

  function eleget0(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
  }

  function isinscreen(ele) {
    if (!ele) return 0;
    var eler = ele.getBoundingClientRect();
    return (eler.top > 0 && eler.left > 0 && eler.left < window.parent.screen.width && eler.top < window.parent.screen.height);
  }
})();
