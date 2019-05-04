// ==UserScript==
// @name        himado To Flash Script
// @namespace   Scottie400
// @include     http://himado.in/*
// @exclude     http://himado.in/
// @exclude     http://himado.in/?keyword*
// @exclude     http://himado.in/?mode*
// @exclude     http://himado.in/?sort*
// @version     1.12
// @grant       none
// @description ひまわり動画において、不具合の多いHTML5から自動でFLASHプレイヤに移動するスクリプトです。
/* ***************************************************************************************************************
 ◆ひまわり動画において、不具合の多いHTML5から自動でFLASHプレイヤに移動するスクリプトです。
 　運営さんの不具合対応が終わるまでの繋ぎなので、簡易的なものになります。
 　Youtube・Dailymotion・veohはサイトの設定で勝手にリダイレクトされどうしようもないのでご容赦。

 ◆Greasemonkey(firefox)、Tampermonkey(Chorome,Opera)というアドオンが必要です。
 　導入方法はこちらを要参照 ⇒ http://dic.nicovideo.jp/a/greasemonkey
 　ユーザースクリプトとは？ ⇒ https://greasyfork.org/

 ※Last Update : 2018-08-17
 ※ご使用は自己責任でお願いします。責任を負いかねます。
 ※推奨環境：Win7が普通に動く程度を満たすスペック・ちゃんと更新しているブラウザ
*************************************************************************************************************** */
// ==/UserScript==


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 編集不要範囲 ここから
var LinkYTFC2DMVE = document.getElementById('top_movie_url_link').innerHTML;
var isExistYT  = LinkYTFC2DMVE.indexOf("youtube.com")!== -1;
var isExistFC2 = LinkYTFC2DMVE.indexOf("fc2.com")!== -1;
var isExistDM = LinkYTFC2DMVE.indexOf("dailymotion.com")!== -1;
var isExistVE = LinkYTFC2DMVE.indexOf("www.veoh.com")!== -1;

$(function(){
    if(document.URL.match('&flashplayer')) {
      exit;
   } else if(isExistYT === true || isExistDM === true || isExistVE === true) {
      exit;
   } else if(document.URL.match(/\/\d{6}$/)) {
      window.location.replace("http://" + $(location).attr('host') + "?id=" + $(location).attr('pathname').replace(/\//g,'') + '&flashplayer');
      exit;
   } else if(document.URL.match(/\?id=\d{6}/)) {
      window.location.replace(document.URL + '&flashplayer');
      exit;
   }
})();
// 編集不要範囲 ここまで
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////