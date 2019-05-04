// ==UserScript==
// @name       Youtube全屏UI改进
// @namespace  https://gqqnbig.me
// @version    0.5
// @description  Youtube全屏播放时，如果暂停，页面上下的工具栏会遮挡一部分视频画面。此脚本令这些工具栏透明或半透明，尽量减少对画面的遮挡。
// @match      https://www.youtube.com/watch?v=*
// @author     gqqnbig
// ==/UserScript==

(function() {
    'use strict';
    document.getElementsByClassName("ytp-gradient-top")[0].remove();
})();
