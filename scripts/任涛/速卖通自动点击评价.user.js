// ==UserScript==
// @name         速卖通自动点击评价
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://feedback.aliexpress.com/management/feedbackSellerList.htm*
// @grant        none
// ==/UserScript==

(function() {
    setTimeout(function(){
        document.querySelector("#buyer-ordertable th input").click();
        setTimeout(function(){
            document.querySelector(".ui-button.ui-button-primary.ui-button-large.evaluate-bt").click();
            setTimeout(function(){
                document.querySelector(".ui-raty-star-trigger.util-clearfix>span:last-child").click();
                setTimeout(function(){
                    document.querySelector("#confirm_cpf").click();
                },10);
            },100);
        },100);
     },1000);
})();