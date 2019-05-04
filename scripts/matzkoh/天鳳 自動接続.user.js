// ==UserScript==
// @name        天鳳 自動接続
// @description Flash 版の ID 入力画面までスキップ
// @include     http://tenhou.net/0/
// @include     https://tenhou.net/0/
// @include     http://tenhou.net/0/?*
// @include     https://tenhou.net/0/?*
// @version     1.0.1
// @author      xulapp
// @namespace   https://twitter.com/xulapp
// @grant       none
// @license     MIT
// ==/UserScript==
// jshint esnext:true, moz:true, globalstrict:true, browser:true

'use strict';

try {
  document.querySelector('form[name="f"]').submit();
} catch (e) {
}
