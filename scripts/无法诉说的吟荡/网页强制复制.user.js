// ==UserScript==
// @name    网页强制复制
// @namespace    http://googlo.me/
// @author	无法诉说的吟荡
// @icon	  http://googlo.me/favicon.ico
// @version	3.3
// @description	右键强力解锁，可以复制一些网站的免费章节或者特殊文字
// @homepage	https://greasyfork.org/zh-CN/scripts/218
// @include        *
// @grant          unsafeWindow
// @require        http://libs.baidu.com/jquery/2.0.0/jquery.min.js

// ==/UserScript==
    function restore(){
    with (document.wrappedJSObject || document) {
    onmouseup = null;
    onmousedown = null;
    oncontextmenu = null;
    }
    var arAllElements = document.getElementsByTagName('*');
    for (var i = arAllElements.length - 1; i >= 0; i--) {
    var elmOne = arAllElements[i];
    with (elmOne.wrappedJSObject || elmOne) {
    onmouseup = null;
    onmousedown = null;
    }
    }
    }

    window.addEventListener('load',restore,true);

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle("html, * {-moz-user-select:text!important;}");