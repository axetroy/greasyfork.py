// ==UserScript==
// @name        IT home float AD remover
// @namespace   charlesyin
// @include     http://*.ithome.com/*
// @version     0.2
// @grant       none
// @description  去掉IT之家页面浮动广告
// ==/UserScript==
function addStyle() {
  document.querySelector('body > div[id="hd_float"]').setAttribute('style', 'display:none !important;');
  document.querySelector('body').setAttribute('style', 'padding-top:0px !important;');
}
document.addEventListener('DOMContentLoaded', function (event) {
  addStyle();
});
