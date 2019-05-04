// ==UserScript==
// @name         嘉兴学院考试成绩查询结果去遮挡
// @namespace    http://mewchen.com/
// @version      0.1
// @description  解决 嘉兴学院考试成绩查询结果（旧版）中，底部图片会遮挡学期等信息的Bug；
// @author       MewChen
// @include      http://210.33.28.180/*
// @include      http://sc.jwc.zjxu.edu.cn/*
// @grant        none
// ==/UserScript==

(function() {
    document.getElementById('bottom').style.display='none';
})();