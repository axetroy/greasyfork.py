// ==UserScript==
// @name         SMZDM寻找自己的发言
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  增加了一个按钮，点击就可以找到自己的发言了。
// @author       Chikango
// @match        www.smzdm.com/p/*/
// @match        https://*.smzdm.com/*
// @grant        none
// @require https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==




(function() {
   // 'use strict';
      var myid=$('[usmzdmid="6918824287"]')
      myid.attr("id","loca")
     $('body').append("<a id=\"mybtn\" href=\"#loca\" style=\"position:fixed;left:0;top:200px;display:block;background-color:yellow\">点击我</a>")
    if(myid.length==0){
    $("#mybtn").text("本页无")
    }

})();