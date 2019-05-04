// ==UserScript==
// @name Minecraft非公式ユーザーフォーラムの投稿欄の「,」を「、」に置換するスクリプト
// @namespace @h_ya58,@_lem0n_(Thanks!)
// @description 記事投稿欄の「，」を「、」に置換します。
// @include http://forum.minecraftuser.jp/posting.php*
// @include https://forum.minecraftuser.jp/posting.php*
// @include http://forum.minecraftuser.jp/ucp.php*
// @include https://forum.minecraftuser.jp/ucp.php*
// @version 1.2.0
// @grant none
// @licence https://creativecommons.org/licenses/by-nc/4.0/
// ==/UserScript==

var element = document.getElementById("message");

element.onblur = function(e){
 var text = document.getElementById("message").value;
 document.getElementById("message").value = text.replace(/，/g,"、");
};
element.onfocus = function(e){
 var text = document.getElementById("message").value;
 document.getElementById("message").value = text.replace(/，/g,"、");
};