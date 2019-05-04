// ==UserScript==
// @name         移除知乎热门(remove zhihu top story)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       rainyleo
// @match        https://www.zhihu.com/
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    function remove() {
        const items = [...document.querySelectorAll('.TopstoryItem')];
        if (items.length) {
            for (const item of items) {
                const title = item.querySelector('.FeedSource-firstline');
                if (title && title.textContent.includes('热门内容')) {
                    item.remove();
                }
            }
        }
    }
    remove();

    const container = document.querySelector(".TopstoryMain >div");
    const ob = new MutationObserver(remove);
    const config = { childList: true };
    ob.observe(container, config);

})();