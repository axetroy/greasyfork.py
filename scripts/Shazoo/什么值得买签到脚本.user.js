// ==UserScript==
// @name         什么值得买签到脚本
// @namespace    https://oi.0w0.io/2018/08/06/smzdm-com-的自动签到脚本/
// @version      2018-09-04
// @description  什么值得买签到脚本，访问任意页面自动签到
// @icon         https://www.smzdm.com/favicon.ico
// @author       Shazoo
// @match        http*://*.smzdm.com/*
// @compatible   chrome
// @compatible   firefox
// @compatible   safari
// @grant        none
// @run-at       document-end
// @license      MIT https://opensource.org/licenses/MIT
// ==/UserScript==

// @2018-09-04   根据smzdm首页修改，调整脚本
// @2018-08-23   测试chrome通过。
// @2018-08-20   修正一个bug。任意页面目前可以自动签到。
// @2018-08-16   修正一个bug。首页实时签到，无需刷新页面看结果。
// @2018-08-15   仅支持首页自动签到==>支持整站任意页面自动签到
// @2018-08-06   基础版本，支持首页自动签到


(function() {
    'use strict';

    // Your code here...
    var cur_url = window.location.href;
    // 首页，主动点击按钮
    if (/www\.smzdm\.com(\/|)$/.test(cur_url)) {
        var btn = document.getElementsByClassName('J_punch')[0];
        if (/签到(得|领|拿)积分/.test(btn.text)) {
            btn.click();
        }
    }else {
        // 非首页，内嵌脚本签到
        var url = 'https://zhiyou.smzdm.com/user/checkin/jsonp_checkin'
        var embed_script = document.createElement('script');
        embed_script.setAttribute('src', url);
        // 把script标签加入head，此时调用开始
        document.getElementsByTagName('head')[0].appendChild(embed_script);
    }
})();