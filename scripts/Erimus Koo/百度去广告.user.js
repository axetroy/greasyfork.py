// ==UserScript==
// @name         百度去广告
// @version      0.21
// @description  Fuck Baidu's Trash Off!
// @author       Erimus
// @match        *www.baidu.com/*
// @grant        none
// @namespace http://erimus.cc/
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    setInterval(function(){
        var spanAll = document.getElementsByTagName("span");
        for(var i=0;i<spanAll.length;i++){
            if(spanAll[i].innerHTML == "广告"){
                var laji = spanAll[i].parentNode.parentNode;
                for (var j=0; j<99; j++){
                    if(laji.parentNode.id=="content_left"){
                        break;
                    }else{
                        laji=laji.parentNode;
                    }
                }
                //laji.style.opacity = 0.5;
                laji.parentNode.removeChild(laji);
            }
        }
    }, 100);
})();