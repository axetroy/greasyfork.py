// ==UserScript==
// @name    魅族商城抢购插件（提高抢购成功概率）
// @namespace   http://www.taoqiwenhua.com/
// @description 抢购过程中，自动检测抢购按钮是否激活，如果激活，则自动触发点击，已经下单页面，自动选中默认支付方式，将支付方式显示在第一屏，不用滚动鼠标至第二屏，节省时间，提高成功率
// @author  yyc <a_yyc1990@163.com>
// @match   *://*.meizu.com/*
// @require http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @run-at  document-end
// @grant   unsafeWindow
// @version 1.2
// ==/UserScript==

$(document).ready(function(){
    var currentDomain = document.domain;
if(currentDomain == "ordercenter.meizu.com"){
            $(".order-total-pay-label:eq(0)").toggleClass("active");
            $(".order-total-pay-label:eq(1)").toggleClass("active");
    $(".order-total-pay-row:eq(1)").remove();
    $(".order-total-pay-row:eq(1)").remove();
    $(".order-total-pay-header").remove();
    $(".order-total-pay-huabei").remove();
    $("#orderTotal").insertBefore($("#addressModule"));
}
});

(function() {
    var videoSite = window.location.href;
    var reMz = /meizu/i;
    var currentDomain = document.domain;
   
    var vipBtn = '<span><a id="J_btnBuy" style="cursor:pointer;text-decoration:none;color:red;padding:0 5px;border:1px solid red;">立即购买</a></span>';
    var vipBtnH5 = '<span><a id="J_btnBuy" style="cursor:pointer;text-decoration:none;color:red;padding:0 15px;border:1px solid red;">立即购买</a></span>';
   
    // 魅族
    if(reMz.test(videoSite)){
        if(currentDomain == "detail.mall.meizu.com"){
            $(".prod-info-header").after(vipBtnH5);
        }else if(currentDomain == "detail.meizu.com"){
            $("#J_price").after(vipBtn);
        }
    }
    
})();