// ==UserScript==
// @name		 AutoQQLogin
// @name:zh-CN   自动QQ登录
// @namespace    AutoQQLogin
// @version      1.0.0
// @description  用于网站自动QQ登录
// @include      http*://xui.ptlogin2.qq.com/cgi-bin/xlogin*
// @run-at 		document-end
// @author       wycaca
// @copyright 	2018+, wycaca
// ==/UserScript==

var now = 1;
var time = 5;
var a,b;
(function() {
    a = window.setInterval(login, 800);
    b = window.setInterval(timeCheck, 800);
})();

function login() {
    now++;
    if (document.getElementById("qlogin_list").childNodes[1].getAttribute("uin").length > 3) {
        var QQNum = document.getElementById("qlogin_list").childNodes[1].getAttribute("uin");
        console.log("QQNumElem: " + document.getElementById("img_out_" + QQNum));
        document.getElementById("img_out_" + QQNum).click();
    }
}

function timeCheck() {
    console.log("now: " + now);
    if(now >= time){
        window.clearInterval(a);
        window.clearInterval(b);
    }
}