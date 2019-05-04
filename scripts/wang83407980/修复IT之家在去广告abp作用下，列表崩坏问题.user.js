// ==UserScript==
// @name         修复IT之家在去广告abp作用下，列表崩坏问题
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  简单增加指定位置高度
// @compatible   chrome
// @compatible   firefox
// @include      *://www.ithome.com/
// @grant        none
// ==/UserScript==

(function () {

    'use strict';

    var url = window.location.href;
    if (url == 'https://www.ithome.com/') {
        forHomepage();
    }

    function forHomepage() {
      document.styleSheets[0].addRule('.new-list li', 'height: 17px');
    }

})();