// ==UserScript==
// @name         Jikobukken Search KANZEN GATTAI for 駅前不動産
// @namespace    https://twitter.com/shiroike_back
// @version      0.5
// @description  10月10日と10月16日あとも、あ・い・し・て・る～♪。ついに事故物件公示サイトと合体だ！！！情熱部屋探しを駅前不動産で
// @author       Enari Shiroike
// @match        https://www.ekimae-r-e.co.jp/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
window.onload=function() {
var bukkenname = document.querySelector('.breadcrumb li:last-child').innerText;
// white-space。まぁいいや。
// var bukkenname_akiguai = document.getElementsByClassName("hline01")[0].innerText;
// document.getElementsByClassName("hline01")[0].innerHTML = '<a href="https://www.google.co.jp/search?as_q=' + bukkenname + '+&as_sitesearch=oshimaland.co.jp&source=lnt&tbs=li:1" target="_blank">この「' + bukkenname_akiguai + '」が事故物件か調べる</a>';
document.getElementsByClassName("hline01 mb20 pttl")[0].innerHTML = '<a href="https://www.google.co.jp/search?as_q=' + bukkenname + '+&as_sitesearch=oshimaland.co.jp&source=lnt&tbs=li:1" target="_blank">この物件が事故物件か調べる</a>';
}
})();