// ==UserScript==
// @name         阻止拷贝文档添加版权信息
// @version      0.2
// @author       jiang
// @description  原理就是覆盖剪切板,理论上大部分网站都支持
// @match        *://*.cnblogs.com/*
// @match        *://*.csdn.net/*
// @match        *://*.jianshu.com/*
// @match        *://*.zhihu.com/*
// @match        *://*.imooc.com/*
// @grant        none
// @namespace https://greasyfork.org/users/59721
// ==/UserScript==

(function() {
    'use strict';
    function setClipboardText(event){
        event.preventDefault();
        var node = document.createElement('div');
        node.appendChild(window.getSelection().getRangeAt(0).cloneContents());
        var htmlData = node.innerHTML ;
        var textData = window.getSelection().getRangeAt(0);
        if(event.clipboardData){
            event.clipboardData.setData("text/html", htmlData);
            event.clipboardData.setData("text/plain",textData);
        }
        else if(window.clipboardData){
            return window.clipboardData.setData("text", textData);
        }
    };
    document.addEventListener('copy',function(e){
        setClipboardText(e);
    });

})();