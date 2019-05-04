// ==UserScript==
// @name         腾讯草泥马QQ空间广告
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description 去除QQ空间顶置傻逼推广广告
// @author       ZLOE
// @match        https://user.qzone.qq.com/*/infocenter
// @require https://cdn.bootcss.com/jquery/3.3.1/jquery.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function tenxun_fuckyou_sb(){
        var find_list = $('.f-single');
        for (var i =0;i<=find_list.length;i++){
            var find_chard = find_list[i];
            console.log(find_chard)
            var fuck =$(find_chard).find('.ui_mr5');
            if (fuck.length>0){
                find_chard.remove();
            }
        }

    }
    tenxun_fuckyou_sb()
