// ==UserScript==
// @name         Speedtest自动测速防卡死代码
// @namespace    [url=mailto:552397723@qq.com]552397723@qq.com[/url]
// @version      0.1.5
// @description [四川移动][综调演示][自动测速]
// @author       潘宇_QQ552397723_TEL18380123411
// @match        https://beta.speedtest.net/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var RepeatTime=0 ;
var RepeatTag="";
(function() {
   run();
    setTimeout(function(){FalutMonitor();},3000);
})();

function run(){
    var iid=setInterval(function(){
         clearInterval(iid);
         var r=document.getElementsByClassName("js-start-test");
         if(r.length===0){
                 run();
         return;
         }
         r=r[0];
         r.click();
         run();
    },1000*8); //可以自行调整延
}

function FalutMonitor(){
    var iid=setInterval(function(){
         if(document.getElementsByClassName("gauge-speed-needle").length<1){
             clearInterval(iid);
            location.href="http://beta.speedtest.net";
         }else{
             var PaintTag=document.getElementsByClassName("gauge-speed-needle")[0].outerHTML;
             if(PaintTag.substring(PaintTag.indexOf("rotateZ(")+8,PaintTag.indexOf("deg)"))===RepeatTag) {
                 RepeatTime=RepeatTime+1;
                 console.log("异常：当前测绘角度未变化："+PaintTag.substring(PaintTag.indexOf("rotateZ(")+8,PaintTag.indexOf("deg)")));
             }else{
                  console.log("正常：当前测绘角度变化中");
                 RepeatTag=PaintTag.substring(PaintTag.indexOf("rotateZ(")+8,PaintTag.indexOf("deg)"));
                 RepeatTime=0;
             }
              if(RepeatTime>30){
            location.href="http://beta.speedtest.net";
              }
         }
    },1000); //可以自行调整延
}