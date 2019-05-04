// ==UserScript==
// @name         简书去广告，剪贴板尾部优化、去除无意义推荐
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  去除页面广告，去除复制剪贴板版权信息、去除页面底部无意义文章推荐
// @author       So
// @match        *://www.jianshu.com/p/*
// @grant        none
// ==/UserScript==

(function () {

    'use strict';

    // 操作数据
    let el,els,new_el,html;

    // 去除悬浮广告块
    el = document.getElementById('note-fixed-ad-container');
    if (el) el.remove();

    // 去除底部广告
    el = document.getElementById('web-note-ad-1');
    if (el) el.remove();

    // 去除无意义推荐
    function deepFreeze(obj) {
        var propNames = Object.getOwnPropertyNames(obj);
        propNames.forEach(function(name) {
            var prop = obj[name];
            if (typeof prop == 'object' && prop !== null) {
                deepFreeze(prop);
            }
        });
        return Object.freeze(obj);
    }

    els = document.querySelectorAll('.note-bottom > .seo-recommended-notes > .note');
    for (let i in els) {
        // 只保留前五条有效推荐
        if (i>4) els[i].remove();
    }

    el = document.querySelector('.note-bottom');
    if (el) {
        html = el.innerHTML;
        el.remove();
    }

    new_el = document.createElement('div');
    new_el.innerHTML = html;
    new_el.className = 'note-bottom';
    document.body.appendChild(new_el);

    // 去除剪贴板追加的版权
    document.addEventListener('copy', e => e.clipboardData.setData('Text', window.getSelection()));
})();
