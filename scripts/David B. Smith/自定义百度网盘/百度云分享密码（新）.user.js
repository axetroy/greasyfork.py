// ==UserScript==
// @name         自定义百度网盘/百度云分享密码（新）
// @version      0.3
// @description  使用说明：点击“创建私密链接”的时候弹出对话框，此时可以输入自定义密码。自定义密码的字符和必须为4，一个字母或数字的字符数是1，一个汉字的字符数是3，因此密码可以是1234、56ok、牛X。本代码参考了zhangnew的代码。
// @author       JiaZH
// @match        http://pan.baidu.com/*
// @match        https://pan.baidu.com/*
// @match        http://yun.baidu.com/*
// @match        https://yun.baidu.com/*
// @match        http://wangpan.baidu.com/*
// @match        https://wangpan.baidu.com/*
// @match        https://eyun.baidu.com/*
// @grant        none
// @namespace https://greasyfork.org/users/82706
// ==/UserScript==

document.addEventListener('click', function(event) {
    if(event.target.title == "分享"){
        window.setTimeout(function() {
            require(["function-widget-1:share/util/service/createLinkShare.js"]).prototype.makePrivatePassword=function(){return prompt("请输入自定义的密码","1234")};
        }, 500);
    }
}, true);