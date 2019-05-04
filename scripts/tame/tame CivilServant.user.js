// ==UserScript==
// @name         tame CivilServant
// @namespace    https://greasyfork.org/zh-CN/users/204669-17763100917
// @match        http://2.17.91.99/CivilServant/Manager/*
// @version      0.1.1
// @description  at the end of with it.
// @grant        none
// @run-at       document-idle
// ==/UserScript==

let mainserver = 'http://2.17.91.99/CivilServant/Manager/';
let loginpage = mainserver + 'Login.aspx';
let logoutpage = mainserver + 'LoginOut.aspx';
let defaultpassword = '888888';

// 登录 http://2.17.91.99/CivilServant/Manager/Login.aspx
if (location.href.startsWith(loginpage)) {
    document.getElementById('LoginName').value = 'qk';
    document.getElementById('LoginPass').value = defaultpassword;
    document.getElementById('ImageButton1').click();
}

// 确认登录 http://2.17.91.99/CivilServant/Manager/Messages.aspx?OPID=24174
if (location.search.indexOf('?OPID=') === 0){
    document.getElementById('Message_Button0').click();
}

// 自动签到签退退出
if (location.href === mainserver + 'default.aspx') {
    window.onload = function () {
        let ServerTime = document.getElementById('mainFrame').contentWindow.document.getElementById('ServerTime').innerText;
        console.log('当前服务器时间为：' + ServerTime);
        // 签到
        if (ServerTime.split(':')[0] < '9') { }
        if (ServerTime.split(':')[0] === '9' && ServerTime.split(':')[1] < '1') {
            document.getElementById('ctl00_PageBody_Button1').click();
            //location.href = logoutpage;
        }
        // 签退
        if (ServerTime.split(':')[0] >= '17') {
            document.getElementById('ctl00_PageBody_Button2').click();
            //location.href = logoutpage;
        }
        else {
            location.href = logoutpage;
        }
    }
}
