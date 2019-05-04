// ==UserScript==
// @name         必应搜索广告去除
// @version      1.1
// @description  去除必应所有搜索结果形式的广告。
// @author       喝杯82年的Java压压惊
// @match        *://cn.bing.com/search*
// @match        *://www.bing.com/search*
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.1.min.js
// @namespace 
// ==/UserScript==

(function () {
    'use strict';
    $(document).ready(function(){
        $("nav.b_scopebar").append(
            "<td class=\"BingAdRemover_InfoPanel\">\r\n" +
            "    <div style=\"width:240px; height=30px; float:left;\" class=\"BingAdRemover_AdsCount\"></div>\r\n" +
            "    <div style=\"width:240px; height=30px; float:left;\" class=\"ButtonContainer\"><button class=\"BingAdRemover_AboutBtn\" title=\"关于必应搜索广告去除器\">关于必应搜索广告去除器</button></div>\r\n" +
            "</td>"
        );
        var AdsDOMCount = $("li.b_ad").children("ul").children("li").length.toString();
        if(AdsDOMCount == "0")
        {
            $("div.BingAdRemover_AdsCount").append("必应搜索广告去除器未检测到广告。");
        }
        else
        {
            $("div.BingAdRemover_AdsCount").append("必应搜索广告去除器已为您移除大约" + AdsDOMCount + "条搜索广告。");
        }
        $("li.b_ad").remove();
        $("button.BingAdRemover_AboutBtn").click(function()
           {
            alert(
            "【必应搜索广告去除器】\n" +
            "版权所有©2016-2018 喝杯82年的Java压压惊\n" +
            "此脚本仅用于非商业用途。"
            );
        });
    });
})();