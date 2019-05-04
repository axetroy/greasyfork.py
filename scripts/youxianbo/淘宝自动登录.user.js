// ==UserScript==
// @name         淘宝自动登录
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include        https://login.taobao.com/member/*
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    //if (confirm('是否自动登录？')) {

            jQuery("#J_Quick2Static").trigger('click');
            jQuery("#TPL_username_1").val("you username");
            jQuery("#TPL_password_1").val("you password");
            jQuery("#J_SubmitStatic").trigger("click");

    //}
})();