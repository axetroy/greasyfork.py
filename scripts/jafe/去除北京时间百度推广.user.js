// ==UserScript==
// @name         去除北京时间百度推广
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  去除北京时间的百度推广广告
// @author       ljh
// @match        https://www.baidu.com/s?*
// @match        https://m.baidu.com/*
// @match        https://blog.csdn.net/*
// @match        http://aoyouzi.iteye.com/*
// @match        https://www.btime.com/*
// @match        http://www.btime.com/*
// @match        https://item.btime.com/*
// @match        http://item.btime.com/*
// @match        http://sh.qihoo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
    $("head").append('<style type="text/css">iframe[src^="https://pos.baidu.com"]{display:none !important;} iframe[src^="http://pos.baidu.com"]{display:none !important;} .qihoobannerslider{display:none !important;}</style>');
    
    removeGuangGao();

    //删除底部的csnd登陆框框
    //console.log( $(".pulllog-box"));
    $(".pulllog-box").remove();
    window.setTimeout(removeGuangGao,1000);
    //window.setInterval(removeGuangGao,5000); 
})();

function removeGuangGao() {
  var filter = $("iframe");
  for (var i = 0; i < filter.length; i++) {
      var src = $(filter[i]).attr("src");
      if (src != null && src.indexOf("pos.baidu.com") > 0) {
          $(filter[i]).parent().hide();
          filter[i].remove();
          //console.log(i);
          // console.log($(filter[i]).parent().parent());
          // $(filter[i]).parent().parent().remove();
      }
  }
}

window.onload=function(){ 
    removeGuangGao(); 
} 