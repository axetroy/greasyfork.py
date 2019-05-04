// ==UserScript==
// @name         自定义百度云/百度网盘分享密码CY（18.04.04）
// @namespace    https://oxn.github.io
// @version      18.04.04
// @description  使用说明：选择文件后点击分享，选择私密，点击创建的时候弹出对话框，此时可以输入自定义密码。自定义密码的字符和必须为4，一个字母或数字的字符数是1，一个汉字的字符数是3，因此密码可以是1234、jj22、帅B。
// @author       oxn
// @match        *://pan.baidu.com/*
// @match        *://yun.baidu.com/*
// @match        *://wangpan.baidu.com/*
// @match        *://eyun.baidu.com/*
// @grant        none
// ==/UserScript==

document.addEventListener('click', function(event) {
    if(event.target.title == "分享"){
        window.setTimeout(function() {
            require(["function-widget-1:share/util/shareFriend/createLinkShare.js"]).prototype.makePrivatePassword = function(){
                return prompt("请输入自定义的密码","cycy");
            };
        }, 500);
    }
}, true);