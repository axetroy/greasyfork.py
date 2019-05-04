// ==UserScript==
// @name        Local_Storage_Clear
// @namespace   nyuru_nyuru.jp
// @description LOCAL STRAGE読み込みエラー発生時にクリア処理（プロフィールのページを開けば作動）
// @include     http://*.3gokushi.jp/user/*
// @version     2015.11.16a
// @grant       none
// ==/UserScript==

var beforeLen = localStorage.length;

$(function(){
   //ダミー関数
});

localStorage.clear();
alert( "localStorageに記録されているデータ量が\n" + beforeLen + " ⇒ " + localStorage.length + " になりました");
