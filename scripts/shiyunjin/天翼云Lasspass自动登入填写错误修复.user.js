// ==UserScript==
// @name         天翼云Lasspass自动登入填写错误修复
// @namespace    https://greasyfork.org/users/158180
// @version      0.2
// @description  由于天翼云表单name值的问题导致Lastpass自动填写出现问题,启用本脚本修复
// @author       Shiyunjin
// @match        https://open.e.189.cn/api/logbox/oauth2/unifyAccountLogin.do*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('input[name=password]').eq(2).remove();
    $('input[name=password]').eq(1).remove();
})();