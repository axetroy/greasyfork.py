// ==UserScript==
// @name         funssy.com - 右键 + 选中内容
// @namespace    moe.jixun
// @version      1.0
// @description  允许在 funssy.com 进行右键以及内容选中操作。
// @author       Jixun
// @include      http://*.funssy.com/*
// @grant        none
// @run-at       document-start
// @license      MIT
// @readme       转载请保留出处以及作者信息，谢谢。
// @donate       https://www.paypal.me/jixun
// ==/UserScript==

addEventListener("DOMContentLoaded", function () {
  document.oncontextmenu = null;
  document.body.style.userSelect = "auto";
});