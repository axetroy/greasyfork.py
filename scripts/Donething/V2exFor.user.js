// ==UserScript==
// @name         V2exFor
// @namespace    https://donething.net/
// @version      0.2
// @description  首页主题列表文字颜色改为黑色，新窗口打开，悬浮@用户 500毫秒显示两人的对话，楼主回复层颜色加深
// @author       Donething
// @match        https://*.v2ex.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var mainTopic = {}; // 当前主题json对象
    var topicAuthor = "";// 当前主题作者
    var allReplies = {};// 所有此帖子内的回复的json对象

    initHtml();// 动态加载css，动态添加会话对话框div

    // 主题页的会话列表
    if(window.location.href.indexOf("v2ex.com/t/" >= 0)){
        // v2ex有很多加速器，导致域名不一定是'https://www.v2ex.com'（如'https://pagespeed.v2ex.com/t/457839'），此时会导致ajax请求跨域。
        // 所以先提取域名，然后使用该域名进行ajax请求
        var host = document.location.protocol + "//" + document.location.host
        $(".reply_content a[href*='/member/']").addClass("at_dialog");// 得到评论下，所有@用户 的<a>标签

        var reg = /\/t\/(\d+)/;
        reg.test(window.location.pathname);
        var tid = RegExp.$1;
        // 同步方式获得当前主题json对象
        $.ajax({
            url: host+'/api/topics/show.json?id=' + tid,
            success: function(data){
                mainTopic = data;
                topicAuthor = mainTopic[0].member.username;
            },
            async: false
        });

        // 楼主回复曾颜色加深
        $(".reply_content").each(function(index){
            if($(this).prevAll("strong").text() == topicAuthor){
                $(this).parents("div").first().css("background", "#D6D6D6");
            }
        });
        // 设置锚点，点击会话框上的#编号，跳到楼层
        $(".no").each(function(){
            $(this).append(`<a name="${$(this).text()}"></a>`);
        });

        // 同步方式下载所有评论，存储到allReplies对象中
        $.ajax({
            url: host+'/api/replies/show.json?topic_id=' + tid,
            success: function(data){
                allReplies = data;
            },
            async: false
        });

        // 每个@用户 标签下添加相关用户的回复
        $(".at_dialog").each(function(){
            // 每个@用户 标签下添加相关回复
            $(this).attr("data-name", $(this).parents("td").children("strong").text());
            $(this).attr("data-at-name", $(this).text());
            // 悬浮@用户 时显示会话列表对话框
            bindRepliesDialog(this);
        });
    }

    // 初始化需要用到的html元素
    function initHtml(){
        // 主题列表标题黑色，新窗口打开
        $(".item_title a").css("color", "black");
        $(".item_title a").attr("target", "_blank");

        // 插入会话对话框和其依赖的css样式
        appendCss("//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.min.css");

        // 点击外部时关闭对话框
        $(document).mouseup(function (e){
            var myDialog = $(".conver_dialog");
            var container = $(".conver_dialog");
            if (myDialog.dialog("isOpen") === true){
                if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0){ // ... nor a descendant of the container
                    myDialog.dialog("close");
                    myDialog.remove();
                }
            }
        });
    }

    // 为元素elem绑定显示会话对话框的事件
    function bindRepliesDialog(elem){
        var timer;
        var delay = 500;
        $(elem).hover(function(e) {
            $(e.target).css("cursor", "wait");
            var html = "";
            var content = "";
            var name = $(elem).attr("data-name");
            var atName = $(elem).attr("data-at-name");
            allReplies.forEach(function(item, index, array){
                if(item.member.username == atName || (item.member.username == name && item.content.indexOf(`@${atName}`) >= 0)){
                    if($(e.target).parent().text().trim() !== item.content.trim().replace(/\r\n/g, "")){// 前者会清楚\r\n换行符，所有将后者的\r\n替换空空""，结尾//g表示全部替换
                        content = `<div>${item.content_rendered}</div>`
                    }else{
                        content = `<div style="opacity: 0.6;text-decoration:none;">${item.content_rendered}</div>`
                    }
                    html += `<div><a href=#${index + 1}>#${index + 1}</a>
<a href='/member/${item.member.username}' target='_blank'>${item.member.username}</a>：
<span style="float:right;">${new Date (item.created*1000).toLocaleString("en-GB")}</span> <br>
${content}
<div>
<hr>`
                }
            });
            timer = setTimeout(function() {
                var converDialog = getConverDialog();
                converDialog.html(html);
                converDialog.dialog("open");
            }, delay);
        }, function() {
            clearTimeout(timer);
        });
    }

    function getConverDialog(){
        $("<div class='conver_dialog' title='会话列表'>对话框内容</div>").appendTo("body");
        var converDialog = $(".conver_dialog").dialog({
            autoOpen : false,
            width: 700,
            height: 600,
            minHeight: 500,
            maxHeight: 800,
            minWidth: 600,
            maxWidth: 900,
            modal: true,
        }).css("background", "#AADDAA").css("font-size", "medium");
        // 不显示对话框标题栏
        $(".ui-dialog-titlebar").hide();
        return converDialog;
    }

    // 动态注入css
    function appendCss(href){
        var elem = document.createElement("link");
        elem.setAttribute("rel", "stylesheet");
        elem.setAttribute("type", "text/css");
        elem.setAttribute("href", href);
        document.head.appendChild(elem);
    }

    // 打印对象
    function printObj(obj){
        var des = "";
        for(var name in obj){
            des += name + ":" + obj[name] + ";";
        }
        console.log(des);
    }
})();