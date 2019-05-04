// ==UserScript==
// @name         知乎免登录[2018]
// @namespace    Aloxaf_i
// @version      0.1.1
// @description  一个很简单的脚本, 直接跳转到发现页面
// @author       Aloxaf
// @match        https://www.zhihu.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

if (/www\.zhihu\.com\/sign(up|in)/.test(location.href)) {
    location.href = 'https://www.zhihu.com/explore';
}
