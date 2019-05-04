// ==UserScript==
// @name         贴吧视频贴过滤
// @description  过滤贴吧里的大量无关视频贴，以免影响浏览体验
// @version      0.3
// @author       zdk
// @namespace    https://greasyfork.org/users/66741
// @include http://tieba.baidu.com/p/*
// @include http://tieba.baidu.com/f?*
// @include http://tieba.baidu.com/f/*
// ==/UserScript==

window.onload = function(){
    var a = document.getElementsByClassName('j_threadlist_video threadlist_video')[0];
    if(a){
        a.parentNode.removeChild(a);
    }
    var laji_list = document.getElementsByClassName('threadlist_video');
    for (var i = laji_list.length - 1; i >= 0; i--) {
        var laji = laji_list[i];
        for (var j=0;j<10;j++){
            laji = laji.parentNode;
        }
        laji.parentNode.removeChild(laji);
    }
};