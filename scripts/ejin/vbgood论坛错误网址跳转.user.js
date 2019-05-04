// ==UserScript==
// @name         vbgood论坛错误网址跳转
// @version      2015.08.03
// @description  vbgoogd旧网址格式替换成新网址
// @author       ejin
// @match        http://www.vbgood.com/viewthread.php?tid=*
// @match        http://vbgood.com/viewthread.php?tid=*
// @grant        none
// @namespace https://greasyfork.org/users/3689
// ==/UserScript==

location.href="http://www.vbgood.com/thread-" + location.href.split("tid=")[1].split("&")[0] + "-1-1.html"