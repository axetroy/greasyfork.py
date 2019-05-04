// ==UserScript==
// @name         屏蔽圣王薇薇欧的无头漫画讨论贴
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  用于在NGA猴区屏蔽屏蔽圣王薇薇欧的无头漫画讨论贴
// @author       a
// @match        *://bbs.nga.cn/thread.php?fid=-447601*
// @match        *://nga.178.com/thread.php?fid=-447601*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function doRemove() {
        var topicRows = document.getElementsByClassName("topicrow");
        for (var i = topicRows.length - 1; i >= 0; --i) {
            var topicRow = topicRows[i];
            var author = topicRow.getElementsByClassName("author")[0].textContent;
            if (author !== "圣王薇薇欧") {
                continue;
            }
            var title = topicRow.getElementsByClassName("c2")[0].textContent;
            if (title.indexOf("漫画讨论") < 0) {
                continue;
            }
            topicRow.parentNode.remove();
        }
    }
    function hookProgbar() {
        var originProgFunc = commonui.progbar;
        commonui.progbar = function(v) {
            if (v === 100){
                console.log('in hooked func');
                setTimeout(doRemove, 500);
            }
            return originProgFunc.apply(this, arguments);
        }
    }
    hookProgbar();

    setTimeout(doRemove, 500);
})();