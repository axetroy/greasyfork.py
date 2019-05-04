// ==UserScript==
// @name              屏蔽百度广告
// @namespace         hyddg@outlook.com
// @version           0.27
// @description       测试
// @author            hyddg@outlook.com
// @match             *://www.baidu.com/*
// ==/UserScript==
{
    setInterval(()=> {
        //删除搜索广告
        let ads = document.querySelectorAll("#content_left>:not(.c-container):not(.hit_top_new)");
        ads.forEach(e=> {
            e.parentNode.removeChild(e);
        });
        let contents = document.querySelectorAll("#content_left>.c-container");
        contents.forEach(e=> {
            let adText = e.querySelector(".result>.f13>.m");
            if (adText && adText.innerText == "广告") {
                e.parentNode.removeChild(e)
            }
        });
        let fyb = document.querySelector(".FYB_RD");
        if (fyb) {
            fyb.parentNode.removeChild(fyb);
        }
        let adWidget = document.querySelector(".ad-widget");
        if (adWidget) {
            adWidget.parentNode.removeChild(adWidget);
        }
    }, 1500);
}