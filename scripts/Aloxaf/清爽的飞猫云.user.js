// ==UserScript==
// @name         清爽的飞猫云
// @namespace    Aloxaf_i
// @version      0.1.1
// @description  去除飞猫云烦人的干扰元素&时间限制
// @author       Aloxaf
// @match        https://www.feemoo.com/*
// @grant        GM_addStyle
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

/* jshint esversion: 6 */

let mode = localStorage.mode;

if (!/1|2/.test(mode)) {
    mode = prompt('首次使用, 请选择模式(默认为2):\n1 - 仅屏蔽干扰元素\n2 - 直接跳转到下载链接', '2')
    localStorage.mode = mode;
}

// 去除干扰元素
if (/fmdown.php/.test(location.href)) {
    GM_addStyle('#vecytable > div:first-child {display: none !important;}')
    GM_addStyle('.down_two1 {display: none;}');
} else {
    GM_addStyle('.botnbixg {display: none;}');
    GM_addStyle(`
    .index_main > .down_two1 {display: none;}
    .index_main > .down_two1:last-child {display: block;}
    `);
}

// 取消两次下载间的时间限制
document.cookie = "fmcheck=0; domain=.feemoo.com";
document.cookie = "down_file_log=0; domain=.feemoo.com";

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let $ = unsafeWindow.$;
    let layer = unsafeWindow.layer;

    // 关闭弹出窗口
    layer.closeAll();

    if (/fmdown.php/.test(location.href)) {
        mode != '1' && $('.thrcomd').click();
         // 取消显示下载地址前的等待
        $('.loadtime').hide();
        $('.thrcomd').css('display','inline-block');
        $('.ndtps').css('display','block');
        $('.sfdbtn').css('display','inline-block');
        $('.wandfile').css('display','inline-block');
    } else {
        layer.closeAll();
        unsafeWindow.layer = undefined;
        mode != '1' && $('.doudbtn2')[0].click();
    }

    // 取消弹幕
    $.fn.barrager.removeAll();
    $.fn.barrager = undefined;
});
