// ==UserScript==
// @name		淘宝网小功能
// @description	1.自动勾选匿名购买。
// @namespace   bac818db1a548ba71e11b6923634275d
// @include     https://buy.taobao.com/auction/order/confirm_order.htm*
// @include     https://buy.taobao.com/auction/buy_now.jhtml*
// @author			ejin
// @version     2017.03.22
// @grant        none
// ==/UserScript==



//貌似速度太快了不能给表单填入内容，延迟一下
var thefunid=setInterval(function (){
    if (document.body.innerHTML.indexOf("匿名购买")) {
        if ( document.getElementById("anonymous_1").getElementsByClassName("toggle-checkbox")[0].checked === false ){
            document.getElementById("anonymous_1").getElementsByClassName("toggle-checkbox")[0].click();
        }
        clearInterval(thefunid);
    }
},1000);