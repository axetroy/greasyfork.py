// ==UserScript==
// @name         自定义百度云分享密码
// @namespace    http://zhangnew.com/
// @version      0.2.2
// @description  目前限制在网页版百度云网盘的“全部文件”下使用：点击“创建私密链接”的时候弹出对话框，此时可以输入自定义密码。注：自定义的密码字符和必须为4（一个字母或数字的字符数是1，一个汉字的字符数是3，因此如果密码中有一个汉字则只能加一个字母或数字），如：as53、9527、帅B 等，亲测可用中文。使用环境：Chrome 50 + Tampermonkey，其他环境请自行测试。
// @author       zhangnew
// @match        http://pan.baidu.com/disk/home*
// @match        https://pan.baidu.com/disk/home*
// @grant        none
// ==/UserScript==

document.addEventListener('click', function(event) {
    if(event.target.title == "分享"){
        window.setTimeout(function() {
            require(["function-widget-1:share/util/service/createLinkShare.js"]).prototype.makePrivatePassword = () => {
                return prompt("请输入自定义的密码", "1234");
            };
        }, 500);
    }
}, true);
