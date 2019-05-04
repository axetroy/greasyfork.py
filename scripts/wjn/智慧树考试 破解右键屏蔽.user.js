// ==UserScript==
// @name         智慧树考试 破解右键屏蔽
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  智慧树考试和作业页面现在屏蔽了右键和选择，不能选择后右键-搜索，此脚本就简单的破解右键屏蔽
// @author       wjn
// @match        http://exam.zhihuishu.com/onlineExam/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
document.querySelector('.myschool_ewcon').onselectstart = null;
document.querySelector('.myschool_ewcon').oncontextmenu = null;
document.querySelector('.grayBg').onselectstart = null;
document.querySelector('.grayBg').oncontextmenu = null;
document.oncontextmenu = null;
document.onselectstart = null;
})();