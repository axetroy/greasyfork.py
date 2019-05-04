// ==UserScript==
// @name         删除凤凰大风号文章无用页面元素
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://wemedia.ifeng.com/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector('.txt_share_box').remove();
    document.querySelector('.yc_cmt').remove();
    document.querySelector('.yc_intro').remove();
    document.querySelector('.yc_rec').remove();
    document.querySelector('.yc_con_r').remove();
    document.querySelector('.yc_con_l').style.width = '100%';

    // Your code here...
})();