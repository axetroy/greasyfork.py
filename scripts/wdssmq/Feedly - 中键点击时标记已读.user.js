// ==UserScript==
// @name         Feedly - 中键点击时标记已读
// @namespace    www.沉冰浮水.tk
// @version      0.1
// @description  新标签页打开条目时自动标记为已读
// @author       沉冰浮水
// @match        https://feedly.com/*
// @grant        GM_openInTab
// ==/UserScript==

(function() {
  'use strict';
  function $n(e) {
    return document.querySelector(e);
  }
  function $na(e) {
    return document.querySelectorAll(e);
  }
  function addEvent(element, evnt, funct) {
    if (element.attachEvent) // IE < 9
    {
      return element.attachEvent('on' + evnt, funct);
    }
    else
    {
      return element.addEventListener(evnt, funct, false);
    }
  }
  var opt1 = 0;
  addEvent($n("#box"),"mouseup",function (event) {
    if (event.target.className === "title" && event.target.nodeName === "A"){
      var btn = event.target.parentNode.querySelector('.mark-as-read');
      console.log(btn.title === "Mark as read");
      console.log(event.target);
      if (btn.title === "Mark as read"){
        btn.click();
      }
      if (event.button !== 1 && opt1){
        GM_openInTab(event.target.href,true);
      }
    }
  });
  return;
})();