// ==UserScript==
// @name         沈师信箱xmain宽度100%脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  沈师信箱中类名为xmain的div宽度错误设置为auto（width=auto），导致宽屏（分辨率为2560*1080等）显示出现问题，此脚本修正这个问题。
// @author       You
// @match        *://email.synu.edu.cn/*
// @grant        none
// ==/UserScript==

(function() {
    var styleTag = document.createElement ("style");
    var head = document.getElementsByTagName ("head")[0];
    head.appendChild (styleTag);
    var sheet = styleTag.sheet ? styleTag.sheet : styleTag.styleSheet;
                // add a new rule to the style sheet
    if (sheet.insertRule) {
        sheet.insertRule (".xmain{width:100%;}", 0);
    }
    else {
        sheet.addRule (".xmain", "width:100%;", 0);
    }
})();