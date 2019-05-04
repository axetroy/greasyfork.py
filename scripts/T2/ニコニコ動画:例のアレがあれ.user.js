// ==UserScript==
// @name        ニコニコ動画:例のアレがあれ
// @description  メニューバーの「オススメ」を例のアレランキングへのリンクに変えます
// @namespace   root_T2
// @match        http://www.nicovideo.jp/*
// @author       root_T2
// @version     1
// @grant       none
// ==/UserScript==

var a = document.getElementsByClassName("siteHeaderHorizon");
var b = a[0].getElementsByTagName("a");
b[0].href="http://www.nicovideo.jp/ranking/fav/hourly/are";
var c = b[0].getElementsByTagName("span");
c[0].innerHTML = "例のアレ";
