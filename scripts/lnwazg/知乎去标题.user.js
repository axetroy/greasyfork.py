// ==UserScript==
// @name         知乎去标题
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  避免被别人发现你正在看的知乎标题！
// @author       lnwazg
// @match        *://www.zhihu.com/*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.js
// ==/UserScript==

(function() {
        // Your code here...
        console.log("begin to remove ZHIHU title...");
        $(".QuestionHeader-title").hide();
        console.log("End remove ZHIHU title.");
})();