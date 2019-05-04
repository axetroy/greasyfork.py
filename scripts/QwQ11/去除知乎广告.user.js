// ==UserScript==
// @name         去除知乎广告
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       11
// @match        https://www.zhihu.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
      $('.Popover.TopstoryItem-rightButton').parentNode.remove();
})();