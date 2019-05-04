// ==UserScript==
// @name         baidu
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  精简百度搜索首页
// @author       xpc
// @match        https://www.baidu.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $('#u_sp, #s_top_wrap, #s_upfunc_menus,#bottom_container, #u1, .qrcodeCon, #ftCon').hide();  
})();