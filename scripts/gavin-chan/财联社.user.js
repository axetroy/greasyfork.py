// ==UserScript==
// @name         财联社
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  调整网页布局，方便手动复制。
// @author       陈庚
// @match        https://www.cls.cn/
// @grant        none
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';

    //$("div").remove();
    $("body").find('script').remove()
    
    $("div.jsx-2502217557.c-262626.telegraph-index-content.p-r > div").each(function(){
        $(this).prepend("<div>财联社</div>");
        $(this).append("<div>https://www.cls.cn</div>");
    });
    
})();