// ==UserScript==
// @name         CSDN博客专注阅读
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  CSDN 去广告，自动展开其余部分，去除推荐内容、评论内容、顶部栏等区域
// @author       By SimLine
// @match        *://blog.csdn.net/*/article/details/*
// ==/UserScript==

(function(){
        'use strict';

        function $(Eclass){
            var barblock = document.getElementsByClassName(Eclass);
            if(barblock[0]){
                barblock[0].parentNode.removeChild(barblock[0]);
            }
        }

        $('csdn-toolbar');//删除顶部栏
        $('pulllog-box');//删除底部栏
        $('tool-box');//删除工具栏
        $('meau-gotop-box');//删除举报框
        $('comment-box');//删除评论栏
        $('recommend-box');//删除推荐栏
        setTimeout(function(){ $('adblock'); }, 50);//删除插件警告框

        //删除侧边栏
        var sidebar = document.getElementsByTagName('aside');
        sidebar[0].parentNode.removeChild(sidebar[0]);

        //阅读区适配屏幕
        var main = document.getElementsByTagName('main');
        main[0].style.float = "none";
        main[0].style.width = "100%";

        //模拟点击，展开余下内容
        document.getElementById('btn-readmore').click();
    })();