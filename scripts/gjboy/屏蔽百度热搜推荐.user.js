// ==UserScript==
// @name         屏蔽百度热搜推荐
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  屏蔽百度热搜推荐!\
// @author       oldpeppapig.com
// @match        https://www.baidu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById('su').addEventListener("click", function(){
       setTimeout(function(){
            document.getElementsByClassName('FYB_RD')[0].style.display='none';
        } ,2000)
    });

    function display_baidu_prompt(time){
        setTimeout(function(){} ,200)
        while(true){
            if(document.getElementById('_mask')!=null){
                //console.log('_mask not null ');
                setTimeout(function(){} ,200)
            }
            else{
                //console.log('_mask null ');
                setTimeout(function(){
                    document.getElementsByClassName('FYB_RD')[0].style.display='none';
                } ,500)

                break;
            }

        }
        setTimeout(function(){
            document.getElementsByClassName('FYB_RD')[0].style.display='none';
        } ,time)
    }

    if (document.getElementsByClassName('FYB_RD').length>0){
        document.getElementsByClassName('FYB_RD')[0].style.display='none';
    };
    document.getElementById('kw').addEventListener('input',function(){
        display_baidu_prompt(1000);
    });
    document.getElementById('kw').addEventListener('blur',function(){
        display_baidu_prompt(1500);
    });


})();