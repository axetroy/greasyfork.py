// ==UserScript==
// @name         合规审核--空格全选
// @namespace    hegui
// @version      0.2
// @description  合规审核空格一键全选
// @author       myxw94
// @match        https://noah.xiaohongshu.com/noah/approve/items/*
// @grant        none
//@require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==


(function() {

    window.onload = function () {//DOM加载后执行
        window.setTimeout(function(){//确保加载后延迟2秒执行全选
            /* 默认全选*/
            $(":contains('批量标注反馈正确')").click();     //要做的事情
            $(":contains('机器反馈正确')").click();   //要做的事情
        },2000);

    }

    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==32){ // 按空格

            $(":contains('通过并提交标注')").click()
            window.setTimeout(function(){window.close()},3000);//延迟2秒关闭
        }
    };

})();