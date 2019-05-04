// ==UserScript==
// @name         洛谷登录验证码启用回车
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  洛谷登录验证码启用回车确认
// @author       abc2237512422
// @match        https://www.luogu.org/login/loginpage
// @match        https://www2.luogu.org/login/loginpage
// @match        https://www.luogu.org/login/loginpage*
// @match        https://www2.luogu.org/login/loginpage*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector("input[name='verify']").onkeydown=function(event){
        if (event.keyCode==13){
            document.querySelector("a[name='login']").click();
        }
    }
})();