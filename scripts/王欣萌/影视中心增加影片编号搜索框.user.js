// ==UserScript==
// @name         影视中心增加影片编号搜索框
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  增加跳转框
// @author       You
// @match        http://movie.stu.nchu.edu.cn/admin/main.aspx*
// @grant        none
// @require      http://libs.baidu.com/jquery/2.1.4/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    var elm="<<input name='' type='number' id='search_result_input' class='layui-input' placeholder='输入影片编号' style='position: absolute;top: 25%;left: 250px;height:30px;width:120px;'>"
var btn="<a href='' id='search_result_btn' class='layui-btn layui-btn-mini fa-shit'  style='position: absolute;top: 25%;left: 380px;height:30px;width:40px;padding:4px;'>编辑</a>"
var herf="movieedit.aspx?movieid="
$('.admin-side-toggle').after(elm);
$('.admin-side-toggle').after(btn);
$("#search_result_input").change(function (e) {
    var num=$(this).val();
    $("#search_result_btn").attr('href',herf+num);
});
})();