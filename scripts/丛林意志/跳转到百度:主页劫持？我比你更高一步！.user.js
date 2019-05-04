// ==UserScript==
// @name         跳转到百度:主页劫持？我比你更高一步！
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       丛林意志_3360498974
// @include      http://www.hao123.com*
// @include      https://www.hao123.com*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    alert('检测到在访问hao123旗下网址，如果是被网页劫持导致，请点击确定，稍后本插件会带你离开这个地方，如果是主动访问，请关闭油猴中的插件');
    window.location="http://www.baidu.com";//修改提示:可以把www.baidu.com替换为想要的代码
})();