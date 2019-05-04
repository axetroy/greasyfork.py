// ==UserScript==
// @name        知乎_问题_自动点击“更多”按钮
// @namespace   zhihu
// @include     https://www.zhihu.com/question/*
// @version     1
// @grant       none
// @description 知乎_问题_每隔5秒点击“更多”按钮，显示更多答案
// ==/UserScript==

function clickbutton() {
  var buttonone = document.getElementsByClassName("Button QuestionMainAction")
  var i;
    for (i = 0; i < buttonone.length; i++) {
        buttonone[i].click();
    }
}
setInterval(clickbutton, 5000);
