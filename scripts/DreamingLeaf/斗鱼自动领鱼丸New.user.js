// ==UserScript==
// @name         斗鱼自动领鱼丸New
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  有任何意见或建议请留言
// @author       DreamingLeaf
// @match        https://www.douyu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if(location.host==="www.douyu.com"){
        setInterval(function(){
            let countdown = document.querySelector(".RewardModule-countdown");
            let sBox = document.querySelector(".s-box");
            let rewardModal = document.querySelector(".RewardModal");
            let hasNotify = document.querySelector(".RewardModule-notify");
            if(countdown && !sBox && hasNotify) {
                countdown.click();
                document.querySelector(".RewardM-text.enable").click();
                countdown.click();
            }
  //          else if(!countdown && rewardModal && flag){
   //             document.querySelector(".RewardModule-toggle").click();
 //               flag = false;
//            }
        }, 60000);
    }
})();
