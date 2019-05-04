// ==UserScript==
// @name         微博关注列表 添加批量选中按钮功能
// @namespace    http://tampermonkey.net/
// @version      0.0.3
// @description  微博列表页面，没有批量选中按钮，微博默默的给我关注了300多个美白，整容，减肥，微商，乱七八糟的账号，自己一个一个点击取消得累死所以自己想办法加了一个批量选中的按钮。
// @author       DQ 237661791@qq.com
// @require      https://cdn.bootcss.com/jquery/1.7.2/jquery.min.js
// @match        https://weibo.com/*/follow*
// @match        https://weibo.com/*/myfollow?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    $(function () {
        var down_btn_html = '<a href="javascript:void(0);" class="W_btn_a DQ_batch_selected">批量选中</a>';
        //将以上拼接的html代码插入到网页里的ul标签中
        console.log('微博关注列表 添加批量选中功能');
        $("a.btn_link").live('click',function(){
            if($(this).attr('action-type') == 'batselect') {
                var tagObj = $(".opt_bar > div.W_fl:first-child").eq(1);
                tagObj.prepend(down_btn_html);
            }
        });
        $("a.DQ_batch_selected").live('click', function(){
            $.each($("ul.member_ul > li.member_li > div.member_wrap"), function(i, val){
                $(val).click();
            });
        });
    });
})();