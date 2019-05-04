// ==UserScript==
// @name 			百度网页搜索 推广过滤
// @author			qw4wer
// @version			0.0.2
// @description		百度网页搜索 推广过滤，隐藏包含推广的广告
// @include			/www\.baidu\.com\/((s|baidu)\?|#wd|(index.*)?$)/
// @icon			http://www.baidu.com/favicon.ico
// @run-at			document-idle
// @namespace https://greasyfork.org/users/28141
// ==/UserScript==

(function(){
    $("#content_left div").each(function(){
        if($(this).find("span:contains('广告')").length !=0){
            $(this).hide();
        }
    });

})();