// ==UserScript==
// @name         混沌大学视频免费观看
// @namespace    https://github.com/xiaoyu2er
// @version      0.1
// @description  免费观看混沌大学视频
// @author       xiaoyu2er
// @match        *://www.hundun.cn/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {

    $(document.body)
        .on('mousedown', '[allow_play]', function () {
            $(this).attr('allow_play', 1);
        });
})();
