// ==UserScript==
// @name         自定义百度网盘/百度云分享密码新（20180328）
// @version      0.3.3
// @description  使用说明：分享形式选择【加密】，再点击“创建链接”的时候弹出对话框，此时可以输入自定义密码。自定义密码的字符和必须为4，一个字母或数字的字符数是1（暂不支持汉字，查看JS源码应该是百度云有校验），因此密码可以是1234、56ok等。本代码参考了zhangnew的代码。
// @author       Steven
// @match        http://pan.baidu.com/*
// @match        https://pan.baidu.com/*
// @match        http://yun.baidu.com/*
// @match        https://yun.baidu.com/*
// @match        http://wangpan.baidu.com/*
// @match        https://wangpan.baidu.com/*
// @match        https://eyun.baidu.com/*
// @grant        none
// @namespace https://greasyfork.org/users/176878
// ==/UserScript==

document.addEventListener('click', function(event) {
    if(event.target.textContent == "分享"){
        window.setTimeout(function() {
            require(["function-widget-1:share/util/shareFriend/createLinkShare.js"]).prototype.makePrivatePassword=function(){
                return prompt("请输入自定义的密码", "1234");
            };
        }, 500);
    }
}, true);