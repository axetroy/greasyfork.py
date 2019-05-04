// ==UserScript==
// @name         龙珠宝箱
// @namespace    http://dking.online/
// @version      0.2
// @description  自动领取龙珠低保
// @author       DKing
// @match        http://star.longzhu.com/*
// @match        https://star.longzhu.com/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.slim.min.js
// @grant        none
// ==/UserScript==

var clickedtime = 0;
var job = null;

function takegift(){
    if (clickedtime < 5 && ($(".treasure-box-btn")[0].text == "00:00" || $(".treasure-box-btn")[0].text == "00:01" || $(".treasure-box-btn")[0].text == "" ))
    {
        $(".treasure-box-image")[0].click();
        setTimeout(function(){
            $(".treasure-item-active").click();
            setTimeout(function(){
                if($(".treasure-result-dialog-count").length>0) $(".treasure-result-dialog-count").click();
                if($(".tips-dialog-close").length>0) $(".tips-dialog-close")[0].click();
            },2000);
            clickedtime+=1;
        },2000);
    }else if(clickedtime>=5)
    {
        clearInterval(job);
    }
}

job = setInterval(takegift,3000);
