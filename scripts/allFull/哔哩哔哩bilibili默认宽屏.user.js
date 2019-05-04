// ==UserScript==
// @name         哔哩哔哩bilibili默认宽屏
// @namespace    http://css.thatwind.com/
// @version      180904
// @description  Bilibili默认宽屏（帮助点击宽屏按钮）
// @author       遍智
// @match        *://*.bilibili.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
  
    var counter=0;

    go();
  
    function go(){
      
      
        
        counter++;
      

        if(document.querySelector(".bilibili-player-video-btn.bilibili-player-video-btn-widescreen")&&document.querySelector(".bilibili-player-video-btn.bilibili-player-video-btn-widescreen").offsetHeight>0){
          
          
            
            if(document.querySelector("#bangumi_player")){
              
              scrollTo(0,document.querySelector("#bangumi_player").offsetTop);
              
              if(document.querySelector(".bilibili-player-video-btn.bilibili-player-video-btn-widescreen").innerHTML.indexOf("退出宽屏")!=-1) return;

              setTimeout(function(){document.querySelector(".bilibili-player-video-btn.bilibili-player-video-btn-widescreen").click();},500);
              
            }
            
          
            else{
              
               setTimeout(function(){document.querySelector(".bilibili-player-video-btn.bilibili-player-video-btn-widescreen:not(.closed)").click();},500);

            }
          
        }
      
        else{

          
            if(counter>30) return;
              
            setTimeout(go,300);
          
        }
    }


})();