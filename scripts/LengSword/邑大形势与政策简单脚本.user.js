// ==UserScript==
// @name         邑大形势与政策简单脚本
// @namespace    https://github.com/LengSword
// @version      0.02
// @description  只破除了禁止选取复制粘贴的限制,还有时间到了不刷新不会交卷.
// @author       LengSword
// @match        http://course.wyu.edu.cn/xsyzc/eoexam/t_paper.asp
// @match        http://course.wyu.edu.cn/xsyzc/eoexam/t_result.asp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function CheckIsContest(){
        var test = (window.location.href=="http://course.wyu.edu.cn/xsyzc/eoexam/t_paper.asp" || window.location.href=="http://course.wyu.edu.cn/xsyzc/eoexam/t_result.asp");
        if(test)
        {
            document.querySelector("body").onselectstart = null;
            document.querySelector("body").oncontextmenu = null;
            showTime=function showTime(showTimeFlag){
                var showTime=parseInt(showTimeFlag);
                document.getElementById('showTimeDiv').innerHTML=formatTime(showTime);
                showTime = showTime - 1;
                setTimeout("showTime("+showTime+")",999.999); //该数值来自写脚本的人的恶趣味,于是我保留了...
            };
            return;
        }
        setTimeOut(CheckIsContest,1000);
    }

    CheckIsContest();
})();