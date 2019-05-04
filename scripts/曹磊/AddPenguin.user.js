// ==UserScript==
// @name         AddPenguin
// @namespace    http://www.qq.com/
// @version      0.1
// @description  add a penguin logo to www.qq.com
// @author       You
// @match        http://www.qq.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('#tencentlogo').append('<img style="width:80px;" src="//sqimg.qq.com/qq_product_operations/im/qqlogo/imlogo_b.png" alt="QQ">');
})();