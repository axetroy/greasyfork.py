// ==UserScript==
// @name        修正 Discuz 论坛 relatedlink 的 bug
// @description 修正 Discuz 论坛 relatedlink 的 bug（提示当前页面的某个脚本正忙,或者可能已停止响应）
// @namespace   http://www.google.com
// @include     *forum.php?mod=viewthread&tid=*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==
 
Object.defineProperty(window, 'relatedlink', {
    get: function() { return []; },
    set: function() {}
});