// ==UserScript==
// @name         简书外链去除重定向
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  简书外链免跳转，去除重定向，直接访问源地址
// @author       xiaobai050
// @match        *://*.jianshu.com/*
// @grant        none
// @note         2019.02.24-V1.1 去除了目标地址中的知乎跳转
// @note         2019.02.23-V1.0 仅对构成跳转的链接做去除跳转操作 && 对目标地址加了一层反转义处理
// @note         2019.01.15-V0.1 创建
// ==/UserScript==

(function() {
    var pre = "https://link.jianshu.com/?t=";
    var zhihu = "link.zhihu.com/?target=";
    var as = document.getElementsByTagName("a");
    for(var i = 0; i < as.length; i++){
        var a = as[i];
        var link = a.href;
        if(link.startsWith(pre)){
            link = link.replace(pre,"");
            link = decodeURIComponent(link);
            if(link.indexOf(zhihu)!=-1){
                // 去除知乎的跳转
                link = link.replace(/.*link\.zhihu\.com\/\?target=/,"");
                // 知乎也加了一层转义
                link = decodeURIComponent(link);
            }
            a.href = link;
        }
    }
})();