// ==UserScript==
// @name         51cto 关闭全屏广告
// @namespace    http://les1ie.com
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://blog.51cto.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("start...");
    $(".closeMB").click();
    console.log("end");
})();