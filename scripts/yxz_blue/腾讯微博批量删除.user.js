// ==UserScript==
// @name         腾讯微博批量删除
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       imzhi <yxzblue@gmail.com>
// @match        http://t.qq.com/*/mine*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function del() {
        if (!document.querySelector('.delBtn')) {
            location.reload();
        }
        document.querySelector('.delBtn').click();
        setTimeout(function () {
            document.querySelector('.gb_btn.gb_btn1').click();
            delLine();
        }, 500);
    }
    setInterval(del, 15e3);
    del();
})();