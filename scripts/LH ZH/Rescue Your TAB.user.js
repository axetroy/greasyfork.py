// ==UserScript==
// @name Rescue Your TAB
// @author ZHLH
// @description 解除正方系统禁用TAB，建议只在评教时开启，平时关闭。
// @match *://*.cn/*
// @require         http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @version 0.1
// @grant none
// @namespace https://greasyfork.org/users/230533
// ==/UserScript==
(function () {
    'use strict';
    $("#Form1").attr("onkeydown","return None");
})();