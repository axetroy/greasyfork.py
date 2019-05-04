// ==UserScript==
// @name         广城实习周记随意补
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  随意补任意周次周记的脚本
// @author       $(ghost)
// @match        http://219.222.244.54/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let timer=setInterval(()=>{
        if ($){
            clearInterval(timer);
            func();
            alert('周记限制已解除，感谢使用');
        }
    },1000);
    let func=()=>{
    let ajax=$.ajax;
    $.ajax=(data)=>{
        if (data.url=='companyedu/process/weekly-report/get-week-by-stuInternId'){
            let success=data.success;
            data.success=(result)=>{
                let list=[];
                for (let i=1;i<result[0];i++){
                    list.push(i);
                }
                //在本来就有数据的情况下这里会炸，所以必须这样写，我也不明白这里为什么不能直接push,醉了！
                for (let i=0;i<result.length;i++){
                    list.push(result[i]);
                }
                success(list);
            };
        }
        ajax(data);
    };
    };
})();

