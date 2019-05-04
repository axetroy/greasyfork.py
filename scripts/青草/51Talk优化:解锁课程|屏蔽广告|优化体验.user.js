// ==UserScript==
// @name         51Talk优化:解锁课程|屏蔽广告|优化体验
// @namespace    https://gist.github.com/qcminecraft/5498879f8b7fb9008d7d6ea540d56c12
// @version      0.3.1
// @description  解锁课程|屏蔽广告|优化体验
// @author       qingcaomc@gmail.com
// @license      GPLv3
// @match        http://www.51talk.com/*
// @match        https://www.51talk.com/*
// @icon         https://avatars3.githubusercontent.com/u/25388328
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    switch(window.location.pathname){
        case '/reserve/course':{
            console.log("[51 Unlock]已为您解锁所有课程！");
            $('.disable').removeClass('disable');
            if(!window.localStorage.getItem('51unlock')){
                alert("已为您自动解锁所有课程！");
                window.localStorage.setItem('51unlock', 1);
            }
            break;
        }
        case '/user/index':{
            //移除服务号弹窗
            $('.sercice-dialog').remove();
            //移除二维码
            $('.scan-code-junior').remove();
            break;
        }
        case '/merge/index':{
            //优化体验，直接跳转到详情页
            window.location.href = "https://www.51talk.com/reserve/index";
            break;
        }
        case '/':{
            break;
        }
    }
    //强迫症移除消息的数字
    $('.num').remove();
})();