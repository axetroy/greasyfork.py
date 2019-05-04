// ==UserScript==
// @name        DotInstallHidePremium
// @namespace   sei0o.dotinstall.hidepremium
// @description ドットインストールのプレミアム専用レッスンを表示しないようにします。
// @include     http://dotinstall.com/lessons
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

$("tr, li").has("img[alt='PREMIUM']").css("display", "none");
