// ==UserScript==
// @name         昵称自动审核
// @namespace    头像
// @version      0.2
// @description  自动审核昵称
// @author       myxw94
// @match        https://mars.xiaohongshu.com/name-task
// @grant        none
//@require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function() {
    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==32){ // 按空格
            $(".checkbox-item").click()    //选中复选框
            window.setTimeout(function(){$(".--primary").click()},1500);//延迟半秒
            window.setTimeout(function(){$(".--success").click()},3000);//延迟10秒
        }
    };

})();