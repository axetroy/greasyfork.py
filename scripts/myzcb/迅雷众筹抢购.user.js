// ==UserScript==
// @name         迅雷众筹抢购
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  迅雷众筹抢购油猴插件。自己替换最新的itemId。已是最新itemid（9月10日最后一次）
// @author       myzcb
// @match        https://izhongchou.taobao.com/order/confirm_order.htm*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var buyUrl = 'https://izhongchou.taobao.com/order/confirm_order.htm?itemId=558342314063';

    function start_buy(){
        var order_tip_con = document.querySelectorAll(".order-tip-con p")[0];
        if(order_tip_con && order_tip_con.innerText.indexOf("请在支持项目后15分钟内付款哦") < 0){
            console.log('刷新页面继续抢购，请稍后');
            setTimeout(function () {window.location.href=buyUrl;}, 200);
        }
        var submit_form = document.querySelectorAll('#J_submitForm')[0];
        var submit_checkbox = document.querySelectorAll("input[type='checkbox']")[2];
        if(submit_form && submit_checkbox) {
            console.log('正在抢购');
            submit_checkbox.checked = true;
            submit_form.click();
        }
    }

    setInterval(start_buy,200);
})();