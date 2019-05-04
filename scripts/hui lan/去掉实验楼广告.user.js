// ==UserScript==
// @name         去掉实验楼广告
// @namespace
// @version      0.1
// @description  去掉广告
// @author       e
// @include      /^http(s?)://www.shiyanlou.com/(.*)$/
// @grant        unsafeWindow
// @run-at       document-end
// @namespace https://greasyfork.org/users/221396
// ==/UserScript==
//

(function () {
    'use strict';

   setTimeout(function () {
     $(".louplus-top-banner").hide();
   }, 150);
})();