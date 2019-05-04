// ==UserScript==
// @name         未知核弹已经升空
// @namespace    http://www.acfun.cn/
// @version      0.1
// @description  try to take over the world!
// @author       ztcaoll222
// @match        http://*.acfun.cn/
// @grant        none
// ==/UserScript==

(function() {
    setInterval(function(){
        $(".footer-avatar-ac").click();
    }, 10);
})();