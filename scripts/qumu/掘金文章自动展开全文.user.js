// ==UserScript==
// @name         掘金文章自动展开全文
// @namespace    https://github.com/qumuase
// @version      0.0.1
// @description  非登录情况下自动展开全文
// @author       qumuase
// @match        https://juejin.im/post/*
// @supportURL   https://github.com/qumuase/juejin-expand-the-full-text
// ==/UserScript==

(function() {
    function showContent() {
        // 半秒钟后执行
        setTimeout(function(){
            // 移除显示全文及半遮罩按钮
            document.querySelector(".show-full").remove();
            document.querySelector(".show-full-block").remove();
            // 取消限制文章高度
            document.querySelector(".post-content-container").style.maxHeight = "100%";
        },500);
    }
    showContent();
})();