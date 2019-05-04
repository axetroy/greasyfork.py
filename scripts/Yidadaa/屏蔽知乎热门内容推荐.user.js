// ==UserScript==
// @name         屏蔽知乎热门内容推荐
// @namespace    http://tampermonkey.net/
// @version      0.13
// @description  屏蔽知乎feed流的热门推荐
// @author       Yidadaa
// @match        https://www.zhihu.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let lastItemCount = 0;
    const selectItems = () => document.querySelectorAll('.TopstoryItem');
    const container = document.querySelector('.Topstory-mainColumn');
    const doRemove = () => {
        const newItems = selectItems();
        if (newItems.length !== lastItemCount) {
            Array.from(newItems)
                .filter(v => v.innerText.indexOf('热门内容') > -1)
                .forEach(v => v.style.display='none');
            lastItemCount = newItems.length;
        }
        const containerHeight = container.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;
        if (containerHeight < windowHeight) {
            container.style.marginBottom = `${windowHeight - containerHeight + 100}px`;// 防止页面无法滚动，导致无法触发知乎刷新
        }
    };
    const oldListener = window.onscroll;
    window.onscroll = () => {
        if (!!oldListener) oldListener();
        doRemove();
    };
    const oldOnload = window.onload;
    window.onload = () => {
        if (!!oldOnload) oldOnload();
        doRemove();
    };
})();