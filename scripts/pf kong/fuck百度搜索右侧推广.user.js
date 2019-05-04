// ==UserScript==  
// @name         fuck百度搜索右侧推广  
// @namespace    http://kongpingfan.com/  
// @version      0.1.2
// @description  将百度右侧的结果屏蔽掉。  
// @author       pyufftj  
// @match        *://*.baidu.com/*  
// @grant        none  
// ==/UserScript==   
(function() {  
    'use strict';  
  
    if (location.hostname=="www.baidu.com"){  
        var auto = setInterval(function() {  
            if (document.getElementById('content_right')){  
                document.getElementById('content_right').style.display="none";  
            }  
            if(document.getElementById('rrecom-container')){  
                document.getElementById('rrecom-container').style.display="none";  
            }  
            if(document.getElementsByClassName("opr-recommends-merge-content")[0]){  
                document.getElementsByClassName("opr-recommends-merge-content")[0].style.display="none";  
              
            }  
        }, 500);  
    }  
  
})();  