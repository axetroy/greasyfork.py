// ==UserScript==
// @name           CoolapkTrueUrl
// @namespace  https://greasyfork.org/users/739
// @description  将短链接显示为真实URL
// @include        http://www.coolapk.com/*
// @homepageURL https://greasyfork.org/zh-CN/scripts/3133
// @version        2015.05.14
// @grant           none
// @run-at         document-end
// ==/UserScript==

/*
* 使用MutationObserver对象封装一个监听DOM生成的函数
* http://javascript.ruanyifeng.com/dom/mutationobserver.html
*/
(function(win){
  'use strict';

  var listeners = [];
  var doc = win.document;
  var MutationObserver = win.MutationObserver || win.WebKitMutationObserver;
  var observer;

  function ready(selector, fn){
    // 储存选择器和回调函数
    listeners.push({
      selector: selector,
      fn: fn
    });
    if(!observer){
      // 监听document变化
      observer = new MutationObserver(check);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true
      });
    }
    // 检查该元素是否已经在DOM中
    check();
  }

  function check(){
  // 检查DOM元素是否匹配已储存的元素
    for(var i = 0; i < listeners.length; i++){
      var listener = listeners[i];
      // 检查指定元素是否有匹配
      var elements = doc.querySelectorAll(listener.selector);
      for(var j = 0; j < elements.length; j++){
        var element = elements[j];
        // 确保回调函数只会对该元素调用一次
        if(!element.ready){
          element.ready = true;
          // 对该元素调用回调函数
          listener.fn.call(element, element);
        }
      }
    }
  }

  // 对外暴露ready
  win.ready = ready;

})(this);

ready('a[href^="http://coolapk.com/r/"]', function(element){
    //console.log('元素被添加');
    var newUrl = this.title;
    //console.log(this.href, newUrl);
    this.innerHTML=newUrl;
    this.setAttribute('href', newUrl);
});