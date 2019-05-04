// ==UserScript==
// @name         自定义百度网盘分享密码
// @namespace    https://www.soardev.com/
// @version      0.3
// @description  使用说明：点击“创建链接”的时候弹出对话框，此时可以输入自定义密码。自定义密码的字符和必须为4，一个字母或数字的字符数是1，一个汉字的字符数是3
// @author       Soar Qin
// @match        *://pan.baidu.com/*
// @match        *://yun.baidu.com/*
// @match        *://wangpan.baidu.com/*
// @match        *://eyun.baidu.com/*
// @grant        none
// ==/UserScript==

document.addEventListener('click', function(event) {
    if(event.target.textContent == "分享" || event.target.textContent == "分享(S)"){
        window.setTimeout(function() {
            require(["function-widget-1:share/util/service/createLinkShare.js"]).prototype.makePrivatePassword=function(){return prompt("请输入自定义的密码","1234");};
        }, 10);
    }
}, true);
