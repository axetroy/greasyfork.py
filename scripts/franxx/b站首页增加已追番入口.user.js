// ==UserScript==
// @name         b站首页增加已追番入口
// @namespace    
// @version      0.1.2
// @description  在bilibili网页端上方菜单添加[已追番]的入口
// @author       franxx
// @match        *://www.bilibili.com/*
// @match        *://space.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {//首页增加追番入口
    var cookies = document.cookie;
    var id=cookies.match(/DedeUserID=(\d+)/)[1];
    go();
    function go(){
        var Obj=document.querySelector("[report-id=playpage_dynamic]");
        if(Obj){
            $("<li report-id='nop' class='nav-item'> <a href='//space.bilibili.com/"+id+"/bangumi' target='_blank' class='t'>追番</a></li>").insertAfter(Obj);
        }else{setTimeout(go,500);}
    }
})();