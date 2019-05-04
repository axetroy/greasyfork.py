// ==UserScript==
// @name        Block Zhihu QuestionTitle
// @namespace   undefined
// @description 屏蔽网页版知乎查看答案时自动浮现的问题标题
// @include     *://www.zhihu.com/question/*
// @version     0.02
// @connect-src       www.zhihu.com
// ==/UserScript==

(function() {
    'use strict';
var titleBlock=document.getElementsByClassName("QuestionHeader-title")[0];
    titleBlock.style.display="none";
titleBlock=document.getElementsByClassName("HitQrcode")[0];
    titleBlock.style.display="none";
})();