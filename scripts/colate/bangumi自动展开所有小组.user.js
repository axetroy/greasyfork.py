// ==UserScript==
// @name         bangumi自动展开所有小组
// @namespace    https://github.com/colodes
// @version      0.11
// @description  自动滚动展开bangumi所有小组
// @author       dxgsdtx
// @include      *://bgm.tv/group/all
// @include      *://bangumi.tv/group/all
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $("#columnSubjectBrowserA > a:nth-child(5)").trigger("click");
    var loadAllGroup = setInterval(function(){
        var scrollBottom = $(window).scrollTop() + $(window).height();
        window.scrollTo(0,scrollBottom);
        var xh = $("#columnSubjectBrowserA > div > span").text();
        xh = xh.replace(/\s+/g,"");
        var nowPage = /\d+/.exec(/\(\d+\//.exec(xh)[0])[0];
        var allPage = /\d+/.exec(/\/\d+\)/.exec(xh)[0])[0];
        if(nowPage == allPage){
           clearInterval(loadAllGroup);
       }
    },200);
})();