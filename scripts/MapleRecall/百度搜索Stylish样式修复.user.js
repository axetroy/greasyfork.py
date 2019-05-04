// ==UserScript==
// @name            百度搜索Stylish样式修复
// @namespace       https://greasyfork.org/users/4
// @description     Restore Stylish styles from deletion on baidu.com
// @version         1.0
// @author          Maplerecall
// @match           *://www.baidu.com/*
// @run-at          document-start
// ==/UserScript==

function fixBaiduStyle(){
    if(window.location.href.indexOf("/s?")==-1){
        if(window.location.href.indexOf("#wd")!=-1){
            window.location.href="http://www.baidu.com/s?wd="+window.location.href.substring(window.location.href.indexOf("=")+1,window.location.href.indexOf("&"));
        }
        else {
            setTimeout(fixBaiduStyle,500);
        }
    }
}
fixBaiduStyle();