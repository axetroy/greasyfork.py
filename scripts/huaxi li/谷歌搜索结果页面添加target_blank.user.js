// ==UserScript==
// @name         谷歌搜索结果页面添加target_blank
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       https://github.com/justwe7
// @match        *://www.google.com/search?*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var aLink = document.querySelectorAll('#search a[href]');
    for (var i = 0, k = aLink.length; i < k; i++) {
        aLink[i].setAttribute('target', '_blank');
    }
})();