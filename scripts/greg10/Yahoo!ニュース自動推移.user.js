// ==UserScript==
// @name        Yahoo!ニュース自動推移
// @namespace   http://webfile.blog.jp/
// @description Yahoo!ニュースのリンクを自動で推移します。
// @include     http://news.yahoo.co.jp/pickup*
// @include     https://news.yahoo.co.jp/pickup*
// @version  1.0.1
// @license	http://creativecommons.org/licenses/by-nc/3.0/
// @grant       none
// @run-at document-end
// @describe    Yahoo!ニュースのリンクを自動で推移します。
// ==/UserScript==


var obj = document.querySelector(".tpcNews_detailLink > a");
console.log("obj="+obj);
var link = obj.getAttribute("href");

console.log("link="+link);
location.href = link;

//--End Script--
