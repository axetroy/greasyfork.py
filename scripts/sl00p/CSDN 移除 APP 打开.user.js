// ==UserScript==
// @name         CSDN 移除 APP 打开
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  自动展开内容，移除讨厌的 APP 内打开
// @author       sl00p
// @match        https://blog.csdn.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var interval = setInterval(function() {
        var listNodes = document.getElementsByClassName("container-fluid container-blog app-open-box");
        for(var idx = 0; idx < listNodes.length; ++idx) {
            listNodes[idx].className = "container-fluid bdinsert"
        }
        if(listNodes.length === 0) {
            clearInterval(interval);
        }
    }, 1000);
    var removeInter = setInterval(function() {
        var removeNodes = ["flag col-md-4", "btn_app_link"];
        for(var jdx = 0; jdx < removeNodes.length; ++jdx) {
            var nodes = document.getElementsByClassName(removeNodes[jdx]);
            for(var kdx = 0; kdx < nodes.length; ++kdx) {
                if(nodes[kdx] !== undefined) {
                    nodes[kdx].remove();
                }
            }
        }
        if(removeNodes.length === 0) {
            clearInterval(removeInter);
        }
    }, 1000);
    setTimeout(function() {
        document.getElementsByClassName("read_more_btn")[0].click();
    }, 1000);
    // Your code here...
})();