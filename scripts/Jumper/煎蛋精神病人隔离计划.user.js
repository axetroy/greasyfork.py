// ==UserScript==
// @name        煎蛋精神病人隔离计划
// @namespace   无
// @author      睫毛小金刚
// @description 屏蔽煎蛋某些用户的无聊图和文章的评论
// @include     http://jandan.net/pic*
// @version     1.1
// @grant       none
// ==/UserScript==
var allElements,
thisElement;
allElements = document.getElementsByTagName('strong');
for (var i = allElements.length - 1; i >= 0; i--) {
  thisElement = allElements[i];
  // 使用 thisElement
  var ID = thisElement.firstChild.nodeValue;
  if (ID == 'sein' || ID == '张三') //这里设置成要屏蔽的ID
  {
    thisElement.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisElement.parentNode.parentNode.parentNode.parentNode); //删除其发表的无聊图
  }
}