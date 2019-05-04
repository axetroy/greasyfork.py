// ==UserScript==
// @name         去掉php中文网广告图标
// @namespace
// @version      0.2
// @description  去掉广告图标
// @author       e
// @include      /^http(s?)://www.php.cn/(.*)$/
// @grant        unsafeWindow
// @run-at       document-end
// @namespace https://greasyfork.org/users/221396
// ==/UserScript==
//

(function () {
    'use strict';
    
   setTimeout(function () {
     $(".close_id").hide();
     layer.closeAll();
   }, 150);
})();