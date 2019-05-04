// ==UserScript==
// @name                MicrosoftDocsSwitchingLanguage
// @name:zh-CN          微软文档中英切换
// @name:zh-TW          微軟文檔中英切換
// @description         switch Chinese/English language in Microsoft docs websites.
// @description:zh-CN   在微软文档中切换中文 / 英文
// @description:zh-TW   在微軟文檔中切換中文 / 英文
// @author              dangoron
// @contributor         ladit
// @version             1.2.0
// @namespace           https://greasyfork.org/zh-CN/scripts/33209
// @homepageURL         https://github.com/ladit/Userscripts
// @supportURL          https://github.com/ladit/Userscripts
// @grant               none

// @match               http*://msdn.microsoft.com/en-us/*
// @match               http*://msdn.microsoft.com/zh-cn/*
// @match               http*://docs.microsoft.com/en-us/*
// @match               http*://docs.microsoft.com/zh-cn/*
// ==/UserScript==

var switcher = document.createElement('li');
switcher.innerHTML = '<a href="#">中文 / English 切换</a>';
var actionList = document.querySelector('.action-list');
actionList.insertBefore(switcher, actionList.firstElementChild);

switcher.firstElementChild.addEventListener('click', function () {
  if (document.URL.search(/\/en-us\//) != -1) {
    window.location.replace(location.href.replace(/\/en-us\//, '\/zh-cn\/'));
  }
  if (document.URL.search(/\/zh-cn\//) != -1) {
    window.location.replace(location.href.replace(/\/zh-cn\//, '\/en-us\/'));
  }
}, false);
