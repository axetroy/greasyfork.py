// ==UserScript==
// @name         Bilibili BigCover
// @namespace    https://greasyfork.org/zh-CN/users/196399-xyabc120
// @icon         http://static.hdslb.com/images/favicon.ico
// @version      1.1.2
// @description  查看B站封面大图
// @author       Mr.ZHAO
// @include      *://www.bilibili.com/video/av*
// @include      *://bangumi.bilibili.com/anime/*
// @include      *://www.bilibili.com/bangumi/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcss.com/fancybox/3.3.5/jquery.fancybox.min.js
// @resource     fancyboxCss  https://cdn.bootcss.com/fancybox/3.3.5/jquery.fancybox.min.css
// @grant        GM_getResourceText
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_addStyle
// @note         2018.08.08-v1.0.0 1.变更查看大图显示方式：不再弹出新标签页显示（部分浏览器会要求信任站点弹窗，所以摒弃掉），由当前页面弹层放大显示、2.新增下载及关闭按钮、3.按钮样式优化、
// @note         2018.08.11-v1.1.0 1.解决点击右侧推荐视频后，查看封面依然是首次加载页面的封面图问题、2.优化触发事件的显示方式
// @note         2018.08.25-v1.1.1 1.添加旧版番剧在全屏播放时设置进度条透明样式、2.全屏弹幕输入条不再遮挡字幕、3.添加插件 icon 图标
// @note         2019.03.31-v1.1.2 移除进度条样式控制
// ==/UserScript==

(function () {
    'use strict';

    // 1.添加弹窗样式表
    var fancyboxCss = GM_getResourceText("fancyboxCss");
    var cssNode = document.createElement("style");
    cssNode.setAttribute("type", "text/css");
    cssNode.setAttribute("name", "fancyboxCss");
    try{
        var buttonStyle = `a[data-fancybox]{margin: auto 30px;line-height: 18px;font-size: 12px;cursor: pointer;}.count-wrapper>a[data-fancybox]{color:#222}.count-wrapper>a[data-fancybox]:hover{color: #00a1d6;}.fancybox-content{border-radius: 8px;background-color: transparent!important;}`;
        cssNode.textContent = buttonStyle + fancyboxCss;
        document.querySelector("head").appendChild(cssNode);
    } catch (e){console.log(e.message);}

    // 2.检测 jQuery 是否可用
    if (!window.jQuery) {
        // 若还未加载jQuery, 则监听
        (function waitForJquery(){
            if (!window.jQuery){
                setTimeout(waitForJquery, 100);
            } else appendCoverBtn();
        })();
    } else {
        appendCoverBtn();
    }

    // 3.添加大图按钮
    function appendCoverBtn() {

        var coverBtn = $(`<a id="bilibiliBigCoverLink" data-fancybox><span><i class="van-icon-info_playnumber"></i>&nbsp;查看封面大图</span></a>`).on('click',function(e){
            var imageurl;
            if ($('meta[itemprop="image"]').length !== 0){
                imageurl = $('meta[itemprop="image"]').attr("content");
            }else if($('meta[property="og:image"]').length !== 0){
                imageurl = $('meta[property="og:image"]').attr("content");
            }
            imageurl = imageurl.replace(/http[s]?\:/,'');
            $.fancybox.open({src: imageurl, buttons : ['download','close']});
            return false;
        });

        var appended = false;
        // 容器下每个子元素被修改时，都会触发此动作。采用监听`DOMSubtreeModified`方法是为了避免被官方异步加载的视频数据清空，DOM更新导致已被添加的按钮“重置”而无法挂载。故在DOM变更完成之后添加
        $(".count-wrapper,.video-info-m>.number,.video-data").bind('DOMSubtreeModified', function(e) {
            if(!appended){
                appended = true;
                $(this).append(coverBtn);
            }
        });
    }

})();


