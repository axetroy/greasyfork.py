// ==UserScript==
// @name         南信大滨江教务验证码自动填充
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  南京信息工程大学滨江学院教务系统验证码自动填充
// @author       Alrash
// @match        http://sql.bjxy.cn/(S(*))/default.aspx
// @match        http://sql.bjxy.cn/(S(*))/Default.aspx
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    /*********from http://www.cnblogs.com/fishtreeyu/archive/2011/10/06/2200280.html**********/
    function getCookie(name) { 
        var arr;
        var reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)) {
            return unescape(arr[2]); 
        }else {
            return null; 
        }
    }
    
    var code = $('#TxtYZM');
    
    code.parent().find('iframe').css('display', 'none');
    code.css('display', 'none');

    $('input[id=Button1]').click(function (e) {
        code.val(getCookie('checkcode'));
        console.log(code.val());
    });
})();