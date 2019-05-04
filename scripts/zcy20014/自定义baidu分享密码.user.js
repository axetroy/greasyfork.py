// ==UserScript==
// @name         自定义baidu分享密码
// @namespace    https://pan.baidu.com/
// @version      0.1
// @description  try to take over the world!
// @author       zcy20014@163.com
// @match        https://pan.baidu.com/*
// @grant        none
// @require      https://apps.bdimg.com/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    $("body").bind('DOMNodeInserted', function(e) {
        var createurl=($(".create"));
        console.log(createurl);
        if (createurl){
            if($("#zidingyi").length<=0){
                createurl.before("<div display:none id='zidingyi' onclick=\"javascript:require([\'function-widget-1:share\/util\/shareFriend\/createLinkShare.js\']).prototype.makePrivatePassword=function(){return prompt('密码','Fuli')};\"> </div>");
                $("#zidingyi").click();
            }
        }
    });
})();