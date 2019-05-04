// ==UserScript==
// @name         哔哩哔哩（bilibili.com）分区隐藏
// @version      0.4
// @description  用于隐藏B站首页上不想看到的分区板块
// @author       loonos
// @match        https://www.bilibili.com/
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @namespace https://greasyfork.org/users/33079
// ==/UserScript==
var $ = $ || window.$;

(function() {
    'use strict';

    // 隐藏此列表中的模块
    var hide_list = [];
    hide_module(hide_list);

})();

// 处理差异名称
function unify_name(name) {
    if (name == "正在直播") {
        return "直播";
    }
    if (name == "电视剧") {
        return "TV剧";
    }
    return name;
}

// 获取所有模块列表
function get_module() {
    var result = {};
    var all_module = $(".bili-wrapper .report-wrap-module");
    for (var i = 0; i < all_module.length; i++) {
        var m_id = all_module[i].id ? all_module[i].id : "";
        var m_name = all_module[i].getElementsByClassName("name").length > 0 ? all_module[i].getElementsByClassName("name")[0].innerHTML : "";
        if (m_id !== "" && m_name !== "") { result[unify_name(m_name)] = m_id; }
    }
    return result;
}

// 隐藏列表中的模块
function hide_module(hide_list) {
    var module_list = get_module();
    for (var i = 0; i < hide_list.length; i++) {
        var m_name = unify_name(hide_list[i]);
        if (module_list[m_name]) {

            // 右侧的导航模块
            var module_nav = $("div.sortable:contains('" + m_name + "')");
            module_nav.css("display", "none");

            // 首页的分区板块
            var module_zone = $("#" + module_list[m_name]);
            module_zone.css("display", "none");
        } else {
            console.log("哔哩哔哩（bilibili.com）分区隐藏：分区【" + m_name + "】不存在！");
        }
    }
}
