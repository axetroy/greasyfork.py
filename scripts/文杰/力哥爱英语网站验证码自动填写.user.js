// ==UserScript==
// @name         力哥爱英语网站验证码自动填写
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  力哥爱英语网站验证码自动填写脚本
// @author       Aaron
// @match        https://ienglish521.com/*.html
// @grant        none
// @require      https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var input_verify = $("input[id=verifycode]");
    var input_len = input_verify.length;
    if (input_len > 0){
        input_verify.first().val("诸事顺利");
        $("input[id=verifybtn]").click();
    }
})();