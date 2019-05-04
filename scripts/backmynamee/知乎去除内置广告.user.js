// ==UserScript==
// @name         知乎去除内置广告
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       llr
// @match        https://www.zhihu.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
      $('.Advert--card').parentNode.parentNode.remove();
})();