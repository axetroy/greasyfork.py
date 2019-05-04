// ==UserScript==
// @name         临时屏蔽送书贴直到公布结果那天
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  送书贴一般留言之后意义不大，屏蔽到公布结果那天取消屏蔽
// @author       zjsxwc
// @match        https://www.v2ex.com/
// @grant        none
// @locale       zh-CN
// ==/UserScript==

(function() {
    //临时屏蔽 https://www.v2ex.com/t/379031#reply91
    var endDate = "2017-08-04";
    var title = "顺丰到付，送几本《 Python 地理空间分析指南（第 2 版）》";
    
    var FormattableDate = function(){
        var date = new Date();
        this._date = date;
        $(["getMonth","getDate","getHours","getMinutes","getSeconds","getMilliseconds","getFullYear","toString"]).each(function(_,attrName){
            this[attrName] = function(){
                return date[attrName]();
            };
        }.bind(this));
    };
    FormattableDate.prototype.format = function(fmt) {
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    };
    
    var currentDate = new FormattableDate().format("yyyy-MM-dd");
    if (currentDate >= endDate) {
        return;
    }
    
    $('a').each(function(_,a){
        var content = $(a).text();
        if (content == title) {
            var $targetEle = $(a).closest(".cell");
            if ($targetEle) {
                $targetEle.remove();
            }
        }
    });
})();