// ==UserScript==
// @name        2nyan.org 二次壁 Anti Adblcok Bypass
// @namespace   tw.nya.2cat_anti_adblock_killer
// @description 繞過 Komica 二次壁 / 高解析板的擋廣告檢查程式
// @match       *://*.2nyan.org/*
// @run-at document-start
// @version     7
// @grant       none
// ==/UserScript==

// 已知 TemperMonkey 設定 injection mode = instant 會噴
let scope = (typeof unsafeWindow == "undefined") ? window : unsafeWindow;
scope.google_ad_block = 1;

// TemperMonkey with Instant mode = Default
if( GM_info.scriptHandler == "Tampermonkey" && document.readyState == "interactive" && document.body){
  stop();

  let html = document.documentElement.innerHTML;
  document.open()
  document.write(html);
  document.close();
}