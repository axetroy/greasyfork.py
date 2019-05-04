// ==UserScript==
// @name        567zw_yh
// @namespace   kimihiro@live.cn
// @description 优化567中文网阅读页面
// @include     http://w.567zw.com/book_j.php?*
// @grant       none
// @version 0.0.2.20161027
// ==/UserScript==
var reg;
var booktext = document.getElementById('booktext');
var orgText = booktext.innerHTML;
var newText;
//去掉<br>
reg = new RegExp('<br>[\n]+<br>', 'g');
newText = '<p>&nbsp;&nbsp;' + booktext.innerHTML.replace(reg, '</p><p>&nbsp;&nbsp;') + '</p>';
//去掉多余的空格
newText = newText.replace(/\s/g, '');
booktext.innerHTML = newText;
//调整行高
var Tp = document.getElementsByTagName('p');
for (var i = 0; i < Tp.length; i++) {
  Tp[i].style.lineHeight = '140%';
}
//工具栏滚动
window.onscroll = function () {
  var t = document.documentElement.scrollTop || document.body.scrollTop;
  var topTool = document.getElementsByClassName('toptool') [0];
  topTool.style.top = 0;
  if (t > topTool.offsetHeight) {
    topTool.style.position = 'fixed';
  } else {
    topTool.style.position = '';
  }
};