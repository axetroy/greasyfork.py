// ==UserScript==
// @name         faxuan_auto_login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  输入验证码自动登录
// @author       You
// @match        *.faxuan.net/site/yunnan/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('#code').bind('input propertychange change',function(){
        if($(this).val().length==4){
            $('a.login_button').click();
        }
    });
    // Your code here...
})();