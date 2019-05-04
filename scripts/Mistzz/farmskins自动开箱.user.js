// ==UserScript==
// @name         farmskins自动开箱
// @match        http://farmskins.com/*
// @grant        none
// @version		 0.4
// @description	 none
// @namespace	 farmskins自动开箱
// ==/UserScript==

(function() {
    var count = 0;
    var interval = 6000;  //多少毫秒执行一次
    var need_refresh = false;  //是否需要自动刷新
    var refresh_count = 10;   //自动刷新周期
    var openning = 0;
    var timerVar = setInterval (function() {DoMeEverySecond (); }, interval);

    function DoMeEverySecond ()
    {
        //登录steam
        var x = document.getElementsByClassName("login-link");
        if(x[0]){
            x[0].click();
        }
        else{
            //如果不是每日开箱界面则打开
            if (!window.location.href.match("http://farmskins.com/dailybonus")){
                x = document.getElementsByClassName("menu-img dailybonus");
                if(x[0]){
                    x[0].click();
                }
            }

            //开箱
            x = document.getElementsByClassName("but-open");
            if(openning ===0 && x[0]){
                openning = 1;
                x[0].click();
            }
        }

        //10分钟刷新一次
        if(need_refresh && ++count > refresh_count){
            count = 0;
            window.location.reload();
        }
    }

})();