// ==UserScript==
// @name         自定义百度网盘/百度云分享密码
// @namespace    https:/baidu.com
// @version      0.5
// @description  使用说明：点击“创建私密链接”的时候弹出对话框，此时可以输入自定义密码。自定义密码的字符和必须为4，一个字母或数字的字符数是1，一个汉字的字符数是3，因此密码可以是1234、56ok、牛X。本代码参考了zhangnew  ，David B. Smith ，知乎 李文青 的代码。如有任何问题也不用找我仅仅分享。
// @author       JiaZH
// @match        *://pan.baidu.com/*
// @match        *://yun.baidu.com/*
// @match        *://wangpan.baidu.com/*
// @match        *://eyun.baidu.com/*
// @grant        none
// ==/UserScript==

document.addEventListener('click', function(event) {
    if(event.target.title == "分享"){
        window.setTimeout(function() {
            require(["function-widget-1:share/util/shareFriend/createLinkShare.js"]).prototype.makePrivatePassword=function(){return prompt("请输入自定义的密码","1234")};
        }, 500);
    }
}, true);

