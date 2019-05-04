// ==UserScript==
// @name         CCAPBOX
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      https://code.jquery.com/jquery-latest.js
// @match        http://ccapbox.blog.fc2blog.us/*
// @grant        none
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
//    var divBoxs = $("DIV.topentry_text,DIV.entry_body");
    var divBoxs = $("DIV.topentry_text");

    if (!divBoxs.length) {
 //       alert("!divBoxs.length");
        return; //若获取磁力失败则终止脚本
    }
    for(var i=0;i<divBoxs.length;i++){
        var tDivs = divBoxs.eq(i);
        var reg=new RegExp("去掉中文|去掉中文","g"); //创建正则RegExp对象
        var str = tDivs.html();
        var newstr = str.replace(reg,"");
        var fixreg = new RegExp("[a-zA-Z0-9.\%_\/\-]{10,}(JPG|jpg|PNG|png|GIF|gif)","g");
        var fixstr = newstr.match(fixreg);
        if(fixstr != null)
        {
            if (fixstr.length) {
            $.each(fixstr, function(i, n){
                newstr = newstr.replace(n,"<a href='https://www.google.com/searchbyimage?image_url=http://"+n+"'><img src='http://"+n+"'></a>");
            });
        }
        }
       tDivs.html(newstr);
    }
})();