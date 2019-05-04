// ==UserScript==
// @name        新标签打开链接
// @author      daysv
// @namespace   http://daysv.github.com
// @description 链接强制在新建标签中打开 Open a URL in background new tab
// @version     0.3.0
// @include     *
// @run-at      document-start
// @grant       GM_openInTab
// ==/UserScript==

(function (win) {
    win.addEventListener('click', function (e) {
        if (e.target.href && e.target.tagName === 'A' && e.which === 1) {
            e.preventDefault();
            GM_openInTab(e.target.href, true);
        }
    }, true);
})(window);