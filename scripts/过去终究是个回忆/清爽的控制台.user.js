// ==UserScript==
// @name         清爽的控制台
// @version      1.01
// @description  自动清理控制台！
// @author       过去终究是个回忆
// @namespace    https://greasyfork.org/users/49622
// @homepage     http://nopast.51vip.biz:10001/
// @match        http://*/*
// @match        https://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    setTimeout(function () {
            console.clear();
        }, 1000);
})();