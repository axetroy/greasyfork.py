// ==UserScript==
// @name         巴哈姆特之訂閱看板跳過進板圖頁面
// @description  可以直接跳過進板圖頁面，不用再等進板圖載入啦。
// @namespace    nathan60107
// @version      1.5
// @author       nathan60107(貝果)
// @homepage     https://home.gamer.com.tw/homeindex.php?owner=nathan60107
// @include      *gamer.com.tw/*
// @grant        none
// ==/UserScript==

var newFunc = TOPBAR_show.toString();
newFunc = newFunc.replace('break;case"member"',
`var target = document.getElementsByClassName("TOP-msglist TOP-board");
for(var i=0; i<target.topBarMsgList_forum.children.length; i++){
    target.topBarMsgList_forum.children[i].href = target.topBarMsgList_forum.children[i].href.replace("A.php", "B.php");
}break;case"member"`);
TOPBAR_show = new Function("return " + newFunc)();
