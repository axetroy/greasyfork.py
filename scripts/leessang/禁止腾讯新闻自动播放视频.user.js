// ==UserScript==
// @name  禁止腾讯新闻自动播放视频
// @author      meng
// @version    1.0
// @description  禁止腾讯新闻自动播放视频（如gd.qq.com大粤网等地方新闻）
// @include      *.qq.com/*
// @exclude      *v.qq.com/*
// @note         支持 地方新闻等.qq.com
// @run-at       document-end

// @namespace https://greasyfork.org/users/26617
// ==/UserScript==
(function(){

    if (/^http:\/\/.+\.qq\.com\/.+\.htm.*/.test(location.href) && document.querySelector('.rv-player'))
    {
        document.querySelector('.rv-root-v2').outerHTML="<span style=\"color:red;font-size:10px\">禁止腾讯新闻自动播放视频-【插件已屏蔽本视频】";
    }

})();