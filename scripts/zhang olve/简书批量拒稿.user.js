// ==UserScript==
// @name         简书批量拒稿
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  我就使不想一个个地点(目前版本没有优化，请在投稿处理页打开脚本开关，待所有投稿全部拒绝后，关掉脚本，否则会一直刷新页面)
// @author       zhangolve
// @match        http://www.jianshu.com/*
// @grant        none
// ==/UserScript==

(function() {
    var evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
    /* whatever properties you want to give it */
    });
    window.onload=function(){
   var a=document.querySelector('.push-action');
       
         if(a!==null)
        {
  
    var btn=a.querySelector('.btn-gray');
         
     btn.dispatchEvent(evt);
       
     var timer=setTimeout(function(){
      var modal=document.querySelectorAll('.modal-body')[0];
        
       if(modal!==undefined)
       {
         clearInterval(timer);
    var enter=modal.querySelector('.btn-hollow'); //确认拒绝
        
        enter.dispatchEvent(evt);
        history.go();
    }
     
     },2000);
    }
        else{
            history.go();
        }
      
     
    } ;  
    

    // Your code here...
})();