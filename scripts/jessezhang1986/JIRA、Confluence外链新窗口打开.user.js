// ==UserScript==
// @name         JIRA、Confluence外链新窗口打开
// @namespace    jessezhang1986
// @version      0.1.0
// @description  JIRA、Confluence优化
// @author       jessezhang1986@qq.com
// @include      http*://jira*
// @include      http*://confluence*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //外链新窗口打开
    $('body').on("click", "a.external-link", function(e){
        if($(e.target).attr('target') != "_blank"){
            $(e.target).attr('target', "_blank");
        }
    });
})();