// ==UserScript==
// @name         助手还款时间显示工具
// @namespace    http://p2phelper.cn/
// @version      0.2
// @description  实时展示用户的最近的历史还款时间记录
// @author       小天
// @match        www.yidai.com/invest/a*
// @grant          GM_addStyle
// @require    http://code.jquery.com/jquery-1.11.0.min.js 
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle('.rptime { float:left; display:block;width:150px; }');
    $.ajax({  
        type : "GET",
        dataType:'text',
        url : "/ajaxget/ajax_gethistorylist/?page=1&epage=40&borrow_nid="+borrow_nid+"&user_id="+userid +"&order=history&status=3",      
        success : function(data) {
            var re = /"repay_yestime":"(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})/ig;
            var r = data.match(re);      
            var htmlStr = "<h5 style='font-size:14px;font-weight:bold;'>最近40条还款时间</h5>"; 
            for(var i=0;i<r.length;i++){
                htmlStr += "<span class='rptime'>" +r[i].substring(17) + "</span>";
            }
            var newLayer = $("<div>"+htmlStr+"</div>").css({"position":"absolute","top":"65px","left":"350px"});
            $(".verify.clearfix ul").after(newLayer);
        }  
    });  
})();