// ==UserScript==
// @name         强制使用等线字体
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      2.0.1
// @description  我就是喜欢等线！【解决显示方框问题】
// @author       BackRunner
// @run-at       document-start
// @include      *
// @exclude      *.seedr.cc*
// @exclude      *console.cloud.google.com/cloudshell*
// @grant        unsafeWindow
// @license      MIT
// @require https://greasyfork.org/scripts/29500-%E5%BC%BA%E5%88%B6%E4%BD%BF%E7%94%A8%E5%AD%97%E4%BD%93-%E6%A0%B8%E5%BF%83/code/%E5%BC%BA%E5%88%B6%E4%BD%BF%E7%94%A8%E5%AD%97%E4%BD%93%20-%20%E6%A0%B8%E5%BF%83.js
// ==/UserScript==

// ===============
// 遇到显示方框请手动添加排除或反馈
// ===============
(function() {
    changeFont("DengXian",2);
})();