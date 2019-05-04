// ==UserScript==
// @description Test关闭css
// @namespace 关闭css
// @name 关闭css
// @icon https://apic.douyucdn.cn/upload/avatar/002/86/30/15_avatar_big.jpg
// @version 0.1
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @require  https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @grant GM_xmlhttpRequest
// @grant GM.xmlHttpRequest
// @match https://www.douyu.com/*
// @grant unsafeWindow
// @grant window.close
// @grant window.focus
// @connect api.xiaojie666.com
// @connect open.douyucdn.cn
// ==/UserScript==
  
(function($){
var hideField=['div.PlayerToolbar-Task','div.LuckGiftEnter','div.TurntableLottery'];

setInterval(function(){
    if(hideField&&hideField.length>0){
      hideField.forEach(function(str){
        try{
         var $tmp=$(str);
         if($tmp&&$tmp.length>0&&!$tmp.is(':hidden')){$tmp.hide();}
        }catch(e){}
      });
    }
},59999);

})(jQuery);