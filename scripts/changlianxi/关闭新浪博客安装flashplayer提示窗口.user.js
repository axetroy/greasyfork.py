// ==UserScript==
// @name        关闭新浪博客安装flashplayer提示窗口
// @namespace   *
// @version     1
// @grant       none
// @include     http://blog.sina.com.cn/s/blog_*.html*
// @description 自动关闭新浪博客安装flashplayer提示窗口
// ==/UserScript==

var runcount = 0;
function clickbutton() {
  runcount = runcount + 1;
  if(runcount>9){runcount=10;return;}
  var buttonone = document.getElementsByClassName("CP_w_shut")
  var i;
    for (i = 0; i < buttonone.length; i++) {
        buttonone[i].click();
    }
}
setInterval(clickbutton, 2000);