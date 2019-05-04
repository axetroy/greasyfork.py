// ==UserScript==
// @name         simplify zhihu
// @namespace    https://greasyfork.org/scripts/38774
// @version      0.6
// @description  知乎简化版,去掉固定和浮动内容, 只保留最基本的正文.
// @author       chaosky
// @match        https://www.zhihu.com/question/*
// @match        https://www.zhihu.com/people/*
// @match        https://www.zhihu.com/topic/*
// @match        https://www.zhihu.com/search?*
// @match        https://www.zhihu.com/follow
// @match        https://www.zhihu.com
// @match        https://zhuanlan.zhihu.com/p/*
// @grant        GM_log
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle('.CommentEditor-input { display: none !important; }');
    GM_addStyle('.CommentEditor-singleButton { display: none !important; }');
    GM_addStyle('.Sticky.is-fixed { position: relative !important; }');
    GM_addStyle('.Question-sideColumn--sticky { position: relative !important; }');
    GM_addStyle('.AppHeader { display: none !important; }');
    GM_addStyle('.GlobalSideBar { display: none !important; }');
    GM_addStyle('.Question-sideColumn { display: none !important; }');
    GM_addStyle('.AdblockBanner { display: none !important; }');
    GM_addStyle('.Post-SideActions { display: none !important; }'); //zhuanlan
})();
