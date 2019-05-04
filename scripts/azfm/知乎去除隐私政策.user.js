// ==UserScript==
// @name     知乎去除隐私政策
// @version  3.0
// @author   kwin
// @match    *://*.zhihu.com/*
// @description 去除知乎隐私政策弹框，在不同意的情况下浏览完整内容（纯js实现）
// @namespace https://greasyfork.org/users/184804
// ==/UserScript==

window.onload = function(){
    for (var j = 0; j < 10; j++) {
        setTimeout(function(){
            var d = document.getElementsByClassName("Modal-wrapper")[0];
            if(d){
                d.parentNode.removeChild(d);
                document.getElementsByTagName("html")[0].style = "";
            }
        },j*100);
    }
};