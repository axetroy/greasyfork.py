// ==UserScript==
// @name         google百度搜索屏蔽CSDN
// @icon         https://csdnimg.cn/public/favicon.ico
// @namespace    http://cjcmx.net/
// @version      0.1
// @description  自动在搜索条件后面增加 -csdn， 以此屏蔽csdn网站信息。只适用于google和百度的搜索页面
// @author       cjcmx
// @match        *://www.google.com/search*
// @match        *://www.baidu.com/s*
// @match        *://www.baidu.com/$
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var className = {
        "baidu":"s_ipt",
        "google": "gLFyf gsfi"
    };
    var key = window.location.href.indexOf("://www.baidu.com")!=-1 ? "baidu" : "google";
    var wordInput = document.getElementsByClassName(className[key])[0];
    if(wordInput){
        wordInput.addEventListener("keydown",function(e){
            if(e.key=='Enter' && this.value.length>0 && this.value.indexOf("-csdn")==-1){
                this.value += " -csdn";
            }
        });
        wordInput.addEventListener("blur",function(){
            if(this.value.length>0 && this.value.indexOf("-csdn")==-1){
                this.value += " -csdn";
            }
        });
        wordInput.addEventListener("focus",function(){
            var index = this.value.indexOf(" -csdn");
            if(index != -1){
                this.value = this.value.substring(0,index);
            }
        })
    }
})();