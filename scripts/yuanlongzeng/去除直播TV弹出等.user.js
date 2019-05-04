// ==UserScript==
// @name         去除直播TV弹出等
// @namespace   https://greasyfork.org/zh-CN/users/201000-yuanlongzeng
// @version      0.1.1
// @description  去除直播TV弹出
// @author       ylz
// @match        http://v.zhibo.tv/*
// @grant        GM_xmlhttpRequest

// ==/UserScript==
(function () {
    'use strict';
    $(function () {
        setInterval(hidden_zhibotv, 1000); //自己引用jquery会覆盖原网站的
    });
})();


function hidden_zhibotv() {
    var classes = ["login_reg fixed", "blacktc", "lazy", "downloadPrompt", "definitionSwitch", "free zjd_icon_p", "user-explain explain2", "user_upgrade", "host_upgrade"];
    var ids = ["gift_0", "gift_1", ];

    $.each(classes, function (i, item) {
        $("." + item).css("display", "none");
    });

    $.each(ids, function (i, item) {
        $("#" + item).css("display", "none");
    });
}