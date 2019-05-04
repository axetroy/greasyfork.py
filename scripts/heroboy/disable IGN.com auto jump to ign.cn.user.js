// ==UserScript==
// @name        disable IGN.com auto jump to ign.cn
// @namespace   ywqywqywqywq
// @description 禁止ign.com自动跳转到ign.中国
// @include     http://*.ign.com/*
// @version     1.3
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==
var obj = {
  init:function(){}
}
Object.defineProperty(unsafeWindow,"ZiffIntl",{
  get:function(){return obj;},
  set:function(){}
});