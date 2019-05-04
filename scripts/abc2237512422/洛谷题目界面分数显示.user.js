// ==UserScript==
// @name         洛谷题目界面分数显示
// @namespace    https://www.luogu.org/space/show?uid=10513
// @version      1.0
// @description  在洛谷题目界面显示分数或绿钩，在这个问题被修复之前可以使用此脚本来显示分数
// @author       abc2237512422
// @match        https://www.luogu.org/problemnew/show/*
// @match        http://www.luogu.org/problemnew/show/*
// @match        https://www.luogu.org/problem/show/
// @match        http://www.luogu.org/problem/show/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function showScore(){
        if (document.getElementById("app-header").getElementsByTagName("h1").length==0){
            return;
        }
        clearInterval(scoreLoader);
        var status=document.getElementsByClassName("lg-toolbar")[0].getElementsByTagName("a")[0].outerHTML;
        var title=document.getElementById("app-header").getElementsByTagName("h1")[0];
        title.innerHTML=status+title.innerHTML;
    }
    var scoreLoader=setInterval(function(){showScore()},50);
})();