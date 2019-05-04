// ==UserScript==
// @name         百度网盘网页版隐藏“我的卡包”和“我的应用数据”
// @namespace    https://github.com/zhichengroup/Baidu-network-disk-hidden-folder
// @version      0.9.0 beta
// @description  百度网盘网页版隐藏“我的卡包”和“我的应用数据” 2018-09-27 更新
// @author       zhichengroup
// @match        *://pan.baidu.com/*
// @include      *://pan.baidu.com/*
// @require      https://code.jquery.com/jquery-1.12.4.min.js
/*
# 百度网盘网页版隐藏“我的卡包”和“我的应用数据”
## 2018-09-27 更新
## pan.baidu.com
### 日期
2018/9/27
### 注意
此脚本只能在网页版隐藏“我的卡包”和“我的应用数据”，并不能实际删除！！！
### 联系方式
如果对这个脚本有兴趣，或者想尝试我的思路，脚本失效或者好久没更新请联系我，我会尽量完善。
zhichengroup@gmail.com*/

// ==/UserScript==

(function () {
    'use strict';

    $(document).ready(function(){

        function clearfunc(){
            $("[title='我的卡包']").parent().parent().parent().hide(); // .remove();
            $("[title='我的应用数据']").parent().parent().parent().hide(); // .remove();
        }

        clearfunc();

        $("body").click(function(){
            clearfunc();
        });

        $("body").dblclick(function(){
            clearfunc();
        });

        $("*").mouseenter(function(){
            clearfunc();
        });

        $("*").mouseleave(function(){
            clearfunc();
        });

    });

})();