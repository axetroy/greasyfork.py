// ==UserScript==
// @name         v2ex帖子标题过滤器
// @namespace    http://blog.7xiaowu.cn/
// @version      0.1
// @description  自己改关键字
// @author       暗黑游侠
// downloadURL     http://blog.7xiaowu.cn/other/scripts/v2exfilter.js
// @match        https://www.v2ex.com/
// @match        https://v2ex.com/
// @match        http://www.v2ex.com/
// @match        http://v2ex.com/
// @grant        none
// ==/UserScript==


$('.cell.item').each(function(){
    var ret = false ;
    var tstr ;
    $(this).find(".item_title").find("a").each( function(){
        tstr = $(this).html() ;
        if( tstr.toLocaleLowerCase().indexOf("inbox") > -1 ){
            ret = true ;
        }
    } );
    if( ret ){
        console.log("标题为:\"" + tstr + "\"的内容已被过滤");
        $(this).remove();
        
    }
});
