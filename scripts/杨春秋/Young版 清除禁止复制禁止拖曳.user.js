// ==UserScript==
// @name       Young版 清除禁止复制禁止拖曳
// @description  自己用的清除禁止复制禁止拖曳
// @include     http://mo.nightlife141.com/*
// @version     1.0
// @author      Youngcc
// @grant       none


// @namespace https://greasyfork.org/users/8717
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