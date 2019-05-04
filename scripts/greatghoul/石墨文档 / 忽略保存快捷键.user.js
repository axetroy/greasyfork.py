// ==UserScript==
// @name         石墨文档 / 忽略保存快捷键
// @namespace    http://ghoulmind.com
// @version      0.1
// @description  编辑石墨文档时，按下 Ctrl+s 或者 Cmd+S 不再弹出保存对话框
// @author       greatghoul
// @match        https://shimo.im/spreadsheet/*
// @match        https://shimo.im/doc/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function ignoreSaveShortcut(event) {
        if ((event.ctrlKey || event.metaKey) && event.keyCode == 83) {
            event.preventDefault();
            return false;
        }
    }

    window.addEventListener('keydown', ignoreSaveShortcut, false);
})();