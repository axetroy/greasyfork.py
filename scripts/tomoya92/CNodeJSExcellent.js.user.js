// ==UserScript==
// @name         CNodeJSExcellent.js
// @namespace    DsfB2XVPmbThEv29bdxQR2hzid30iM10
// @version      0.3
// @description  CNodeJS 不用刷新页面自动请求通知消息数，回复列表盖楼风格
// @author       tomoya
// @require      https://cdn.bootcss.com/jquery/2.2.2/jquery.min.js
// @require      https://cdn.bootcss.com/lodash.js/4.17.10/lodash.min.js
// @include      http*://*cnodejs.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('.navbar').css({'position': 'fixed', 'top': 0});
    $('#main').css({'marginTop': '65px'});
    var notificationEl, pageTitle = $('title').text();
    $('.navbar-inner li').each(function(i, v){
        var text = $(this).text();
        if(text.indexOf('未读消息') !== -1) {
            notificationEl = v;
        }
        if(text.indexOf('退出') !== -1) {
            $.get('https://cnodejs.org/setting', function(data) {
                $(data).find('.inner').each(function(){
                    var innertext = $(this).text();
                    if(innertext.indexOf('字符串：') !== -1) {
                        var accessToken = innertext.replace('二维码：', '').replace('字符串：', '').replace('\r\n', '').trim();
                        window.setInterval(function(){
                            $.get('https://cnodejs.org/api/v1/message/count?accesstoken=' + accessToken, function(data) {
                                if(data.data > 0) {
                                    $('title').text('(' + data.data + ') ' + pageTitle);
                                    $(notificationEl).find('a span').remove();
                                    $(notificationEl).find('a').prepend('<span class="big messages_count">'+data.data+'</span>');
                                }
                            });
                        }, 60000);//1分钟一次
                    }
                });
            });
            return;
        }
    });

    // 拿到所有的回复
    var href = location.href;
    if(/\/topic\/[0-9a-z]{24}/.test(href) && $("#content>.panel").length === 3) {
        var replys = [];
        var replysDom = $(".reply_item");
        var replyPanel = $("#content>.panel")[1];
        var replyHeader = $(replyPanel).find(".header");
        $(replyPanel).html("");
        $(replyPanel).html(replyHeader);
        $.each(replysDom, function(i, v) {
            var id = $(v).attr("id");
            var reply_id = $(v).attr("reply_to_id");
            replys.push({
                id: id,
                layer: 0,
                child: 0,
                reply_id: reply_id,
                dom: $(v)
            });
        });
        sort(replys, function(newReplys) {
            $.each(newReplys, function(i, v) {
                v.dom.css("padding-left", v.layer * 30 + 15 + "px");
                $(replyPanel).append(v.dom);
            })
        })
    }

    function sort(replys, cb) {
        var newReplys = [];
        $.each(replys, function(i,v) {
            if(v.reply_id && v.reply_id.length > 0) {
                var index = _.findIndex(newReplys, function(o) { return o.id === v.reply_id });
                if(index >= 0) {
                    v.layer = newReplys[index].layer + 1;
                    newReplys.splice(index + 1 + newReplys[index].child, 0, v);
                    newReplys[index].child = newReplys[index].child + 1;
                } else {
                    newReplys.push(v);
                }
            } else {
                newReplys.push(v);
            }
        });
        cb(newReplys);
    }
})();
