// ==UserScript==
// @name         mebook小书屋自动跳转百度云并填写密码
// @namespace    http://mebook.cc/
// @version      1.3
// @description  一键打开百度云链接并填写密码
// @author       Ming
// @match        http://mebook.cc/download.php?*
// @match        http://www.shuwu.mobi/download.php?*
// @match        https://pan.baidu.com/share/init?*
// @match        https://pan.baidu.com/s/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.host === "mebook.cc" || window.location.host === "www.shuwu.mobi") {
        var passPtag = document.getElementsByClassName("desc")[0].children[6].innerHTML;
        var passMatch = new RegExp("百度网盘密码：([0-9a-z]{4})");
        var pass = passMatch.exec(passPtag)[1];
        if (pass.length === 4) {
            var linkAtag = document.getElementsByClassName("list")[0].children[0];
            //linkAtag.href = linkAtag.href + "#" + pass;
            window.location.href=linkAtag.href + "#" + pass;
        }
    } else {
        if (window.location.host === "pan.baidu.com") {
            var url = window.location.href;
            var matchPass = new RegExp("#([0-9a-z]{4})");

            var passPan = matchPass.exec(url)[1];

            if (passPan.length === 4) {
                var inputTag = document.querySelector('.pickpw input[tabindex="1"], .access-box input#accessCode');
                inputTag.value = passPan;
                var button = document.querySelector('.pickpw a.g-button, .access-box a#getfileBtn');
                button.click();
            }
        }
    }
})();