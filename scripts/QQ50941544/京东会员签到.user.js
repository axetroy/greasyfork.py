// ==UserScript==
// @name         京东会员签到
// @namespace    https://greasyfork.org/zh-CN/users/75882-qq50941544
// @version      20161026
// @description  try to take over the world!
// @author       QQ50941544
// @match        http://tampermonkey.net/scripts.php
// @grant        none
// @include      *//vip.jd.com/*
// ==/UserScript==

var list = document.getElementsByClassName("btns")[0];
list.getElementsByClassName("signup-btn")[0].click();
