// ==UserScript==
// @name         Baidu Helper
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  在百度搜索页面显示Google搜索按钮，点击按钮可跳转到Google搜索当前关键词
// @author       You
// @match        https://www.baidu.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

(function() {
    'use strict';
    // Your code here...

    $('#form').width('760px')
    $('.s_btn_wr,#s_btn_wr').after('<input type="submit" id="google" value="Google一下" class="btn self-btn bg s_btn" style="margin-left:10px;">')
    $('#google').click(function(){
        window.location.href='https://www.google.com.hk/search?q='+encodeURIComponent($('#kw').val())
    })
})();