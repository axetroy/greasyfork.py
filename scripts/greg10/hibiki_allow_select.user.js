// ==UserScript==
// @name        hibiki_allow_select
// @namespace   http://catherine.v0cyc1pp.com/hibiki_allow_select.user.js
// @include     http://hibiki-radio.jp/*
// @author      greg10
// @license     GPL 3.0
// @run-at      document-start
// @version     1.0
// @require     http://code.jquery.com/jquery-3.1.1.min.js
// @grant       none
// @description 響 - Hibiki Radio Station - で文字選択を可能とさせる。
// ==/UserScript==
$('body').css('-webkit-user-select', 'text');
