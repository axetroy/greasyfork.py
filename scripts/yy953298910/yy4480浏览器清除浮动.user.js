// ==UserScript==
// @name         yy4480浏览器清除浮动
// @namespace    http://aaxxy.com/
// @version      1.9.13
// @description  新视觉影院清除浮动插件
// @author       Timi
// @include      http://aaxxy.com/*
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  $(document).ready(function() {
      setTimeout(function(){
          var length=$("a").length;
        var option;
        for(var i=0;i<length;i++){   
          var style=$($("a")[i]).attr("style");
          if(style!=undefined){
             style=style.replace(/ /g,'');

			 
             if(style.indexOf("position:absolute")>-1&&style.indexOf("opacity:0")>-1){

               $($("a")[i]).hide();

               }else if(style.indexOf("position:absolute")>-1&&style.indexOf("opacity:0.01")>-1){
	
               $($("a")[i]).hide();

               }
        
            }
        }
      
      },2000)
  });
})();