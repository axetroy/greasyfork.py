// ==UserScript==
// @name         CNodeJS站内通知
// @namespace    DsfB2XVPmbThEv29bdxQR2hzid30iMF9
// @version      0.3
// @description  CNodeJS站内通知，不用刷新即可知道是否有通知，页头固定在顶部, 1分钟请求一次
// @author       tomoya
// @require      https://cdn.bootcss.com/jquery/2.2.2/jquery.min.js
// @include      http*://*cnodejs.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('.navbar').css({'position': 'fixed', 'top': 0});
    $('#main').css({'marginTop': '65px'});
    var notificationEl, pageTitle = $('title').text();
    console.log(pageTitle);
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
})();