// ==UserScript==
// @name        局名表示
// @namespace   https://greasyfork.org/users/19523
// @description ニコニコ実況のページタイトルに局名を追加
// @include     http://jk.nicovideo.jp/watch/jk*
// @version     0.1
// @grant       none
// ==/UserScript==


document.title = document.getElementById('channel_title').getElementsByTagName('span')[1].innerHTML + ' - ' + document.title;
