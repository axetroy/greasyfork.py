// ==UserScript==
// @name         WordPress Post Backup
// @namespace    https://gitcafe.net
// @version      0.3
// @description  给WordPress网站站长提供文章自动容灾备份的小脚本
// @author       云落
// @include      */wp-admin/post*
// @grant        none
// @charset		 UTF-8
// @run-at		 document-end
// ==/UserScript==

(function() {
    'use strict';

    /* 由于WordPress网站后台自带jQuery，所以这里不再重新载入 */
    $(document).ready(function() {
        function getpostid(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
        var postid = getpostid('post');
        var TOKEN_KEY;
        if (postid) {
            TOKEN_KEY = postid;
        } else {
            TOKEN_KEY = 'newpost';
        }
        //设置缓存
        var setpostca =function (){
            window.localStorage.setItem(TOKEN_KEY, $("#content").val());
        }
        //删除缓存
        var delpostca =function (){
            window.localStorage.removeItem(TOKEN_KEY);
        }
        //输入内容更新缓存
        $("#content").bind("input", setpostca );
        //鼠标聚焦更新缓存
        $("#content").focus( setpostca );
        //保存草稿删除缓存
        $('#save-post').on("click", delpostca );
        //删除文章删除缓存
        $('#delete-action').on("click", delpostca );
        //发布文章删除缓存
        $('#publish').on("click", delpostca );
        //获取恢复
        jQuery(document).on("click", "#get_localstorage", function() {
            var c = window.localStorage.getItem(TOKEN_KEY);
            $("#content").val(c);
            delpostca;
        });
        //增加按钮
        $("#wp-content-media-buttons").append('&nbsp;&nbsp;<a class="button button-primary" id="get_localstorage"  href="javascript:void(0);">&#8634 一键恢复</a>');
    });
})();