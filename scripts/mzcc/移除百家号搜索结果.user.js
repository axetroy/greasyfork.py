// ==UserScript==
// @name         移除百家号搜索结果
// @namespace    http://tampermonkey.net/
// @home-url     https://greasyfork.org/zh-CN/scripts/375240
// @description  删除百度搜索结果的百家号结果
// @version      1.11
// @include      http://www.baidu.com/*
// @include      https://www.baidu.com/*
// @require      http://code.jquery.com/jquery-1.8.2.js
// @author       mzcc
// @note         2019.02.20-1.11 监听页面结构变化，调整代码
// @note         2019.02.20-1.10 监听页面结构变化，修改移除逻辑
// @note         2019.01.28-1.02 移除超时限制
// @note         2019.01.25-1.01 百度搜索页面由于界面变化，观察页面dom的方式已经失效，更换新的去除方式
// @note         2018.12.30-0.15 根据反馈，删除操作做新的变更逻辑
// @note         2018.12.19-0.14 根据百度界面变化，删除操作做新的变更逻辑
// @grant        GM.xmlHttpRequest
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
    
    removeType0();

    // 第一种移除方式
    function removeType0(){
        var titleEl = document.getElementsByTagName("title")[0];
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        if(MutationObserver){
            var MutationObserverConfig={
                childList: true,
                subtree: true,
                characterData: true
            };
            var observer=new MutationObserver(function(mutations){
                dealContent();
            });
            observer.observe(titleEl,MutationObserverConfig);
        }else if(titleEl.addEventListener){
            titleEl.addEventListener("DOMSubtreeModified", function(evt) {
                dealContent();
            }, false);
        }


        dealContent();

        function dealContent() {
            let $container = $('#content_left');
    
            let $aTags = $container.find('a[href^="http://www.baidu.com/link?url="]');
            let $top = $('.c-offset');
            let temp = Array.from($aTags).map(function(v){
                return $(v).attr('href');
            });
    
            // 去重
            temp = Array.from(new Set(temp));
            console.log(temp)
            // 移除
            temp.forEach(function(url, index){
                // 补足url，否则报错
                let tempUrl = url.indexOf("eqid") < 0 ? url + "&wd=&eqid=" : url;
                GM.xmlHttpRequest({
                    method: "GET",
                    url: tempUrl,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                        "Host": "www.baidu.com",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Connection": "keep-alive"
                    },
                    onload: function (response) {
                        let reg = /URL=['|"]([^'|"]+)/;
                        
                        if (reg.test(response.responseText)) {
    
                            let realUrl = response.responseText.match(reg)[1];
    
                            if (realUrl.indexOf('baijia') > -1) {
                                $container.find('a[href="'+url+'"]').parents('.c-container').remove();
                                // 第一项是否还有子元素
                                if (!$top.children().length) {
                                    $top.parent().remove();
                                }
                            } else {
                                // 还原真实地址
                                $container.find('a[href="'+url+'"]').attr('href', realUrl);
                            }
                        }
                    }
                });
     
            });
    
            // 移除百度视频
            let $video = $('.op-short-video-pc');
            if ($video.length) {
                $video.parent().remove();
            }
        }
    }
    

    function removeType1() {
        // 暂未写
    }

})();
