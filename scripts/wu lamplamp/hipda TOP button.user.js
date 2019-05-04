// ==UserScript==
// @name        hipda TOP button
// @namespace    http://tampermonkey.net/
// @version      0.3.2
// @description  Hello world!
// @author       lampwu
// @match        https://www.hi-pda.com/forum/*
// @grant        none
// ==/UserScript==

(    function rolltop() {
     var rott=[];
     rott=document.getElementsByTagName("a");
     for(i=0;i<rott.length;i++){
        if(rott[i].innerHTML =="TOP"){
            rott[i].onclick=function rrr(){
    document.documentElement.scrollTop = 0;
    };
        }
         else{}
     }
})();