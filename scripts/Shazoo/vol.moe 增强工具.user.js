// ==UserScript==
// @name         vol.moe 增强工具
// @namespace    https://oi.0w0.io/2018/08/01/vol-moe-的批量选取油猴脚本/
// @version      2018-08-23
// @description  * 新窗口打开漫画页详情。 * 漫画页中，添加全选按钮，批量选择推送的漫画。
// @author       Shazoo
// @match        http*://vol.moe/comic/*.htm
// @match        http*://vol.moe/
// @match        http*://vol.moe/list*
// @grant        none
// @compatible   firefox,chrome
// @run-at       document-end
// @license      MIT(https://opensource.org/licenses/MIT)


// @2018-08-23   测试支持chrome。


// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    var cur_url = window.location.href;
    if (/^https?:\/\/vol\.moe\/comic\/\d+\.htm/.test(cur_url)){
        // 给漫画详情页添加全选功能
        var loc_btn = document.getElementById('push_button');
        var ctrl_btn = document.createElement('template');
        ctrl_btn.innerHTML='<a href="javascript:void(0);"  id="ctrl_btn" style="margin-right: 10px;" class="weui_btn weui_btn_mini weui_btn_default">全选</a>';
        ctrl_btn = ctrl_btn.content.firstChild;

        loc_btn.parentNode.insertBefore(ctrl_btn, loc_btn);
        var is_selected = false;
        ctrl_btn.addEventListener('click',function(){
            is_selected = ~is_selected;
            var cb = document.getElementsByName('checkbox_push');
            for (var idx=0; idx < cb.length; idx++) {
                cb[idx].checked = is_selected;
            }
            sum_push_item();
        }, false);
    }else {
        // 在列表页面添加新窗口打开功能
        var alist = document.getElementsByTagName('a');
        for (var idx = 0; idx < alist.length; idx++) {
            if (/comic\/\d+\.htm/.test(alist[idx].href)){
               alist[idx].target = '_blank';
            }

        }
    }

})();