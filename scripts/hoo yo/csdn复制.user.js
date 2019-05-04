// ==UserScript==
// @name         csdn复制
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  一行代码解决csdn复制，基于csdn(copyright)修改
// @author       hoo yo
// @match        https://blog.csdn.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    csdn.copyright.init($("article")[0],"","");
})();