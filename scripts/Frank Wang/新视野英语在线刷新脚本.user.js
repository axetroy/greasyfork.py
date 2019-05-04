// ==UserScript==
// @name         新视野英语在线刷新脚本
// @namespace    https://wx2020.cn/
// @version      1.0
// @description  try to take over the world!
// @author       wx2020
// @match        http://210.44.112.108/login/hponlinetime.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function myrefresh()
    {
        window.location.reload();
    }
    setTimeout(myrefresh,Math.round(Math.random())*30000); //指定30秒内刷新一次
})();