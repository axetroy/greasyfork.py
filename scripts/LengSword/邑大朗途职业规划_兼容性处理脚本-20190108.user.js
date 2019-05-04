// ==UserScript==
// @name         邑大朗途职业规划_兼容性处理脚本-20190108
// @namespace    http://wyu.51langtu.com/
// @version      1.0
// @description  处理兼容性问题.使用之前需要进入http://wyu.51langtu.com/index.aspx,此处登录无IE检测
// @author       LengSword
// @match        *://wyu.51langtu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(window.location.pathname.indexOf("/index.aspx") !== -1) {
        window.setInterval(function testCheck() {
            var testDisable = document.getElementById("test_disable");
            if(testDisable != null) {
                testDisable.onclick = function() {
                    window.location.href = "Test.aspx";
                    event.preventDefault();
                    window.clearInterval(testCheck);
                }
            }
        }, 500);
        var activeLink = document.getElementById("activeLink");
        if(activeLink != null) {
            activeLink.onclick = function() {
                window.location.href = "regs.aspx";
                event.preventDefault();
            }
        }
        /*
            document.getElementById("findPwdLink").onclick = function() {
            window.location.href = "FindPWType.aspx";
            event.preventDefault();
            }
        */
    } else if(window.location.pathname.indexOf("/improperBrowser.htm") !== -1) {
        window.location.href = "index.aspx";
    }


})();