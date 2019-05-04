// ==UserScript==
// @name         使用四川大学教务系统导航栏
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  使用川大教务系统顶部导航栏
// @author       Xiongqi
// @match        http://202.115.47.141/loginAction.do
// @match        http://zhjw.scu.edu.cn/loginAction.do
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  window.onload = function() {
    if (
      window.location.href === 'http://202.115.47.141/loginAction.do' ||
      window.location.href === 'http://zhjw.scu.edu.cn/loginAction.do'
    ) {
      window.frames['topFrame'].changeLeftMenu = function() {
        if (
          parent.frames['bottomFrame'] &&
          parent.frames['bottomFrame'].frames['menuFrame'] &&
          parent.frames['bottomFrame'].frames['menuFrame'].menus
        ) {
          parent.frames['bottomFrame'].frames['menuFrame'].menus.index = window.frames['topFrame'].moduleNum;
          parent.frames['bottomFrame'].frames['menuFrame'].menus.show();
          parent.frames['bottomFrame'].frames['menuFrame'].menus.click();
        }
      };
      // 插入链接
      const nameTr = window.frames['topFrame'].document
        .getElementsByClassName('leftuser01')[0]
        .getElementsByTagName('tr')[0];
      const urlTd = document.createElement('td');
      urlTd.innerHTML =
        '<a href="http://draven-system.xhuyq.me/draven" target="_blank" style="color: red" title="一个小系统">第三方教务系统</a>';
      nameTr.insertBefore(urlTd, nameTr.children[0]);
      console.log('成功');
    }
  };
})();
