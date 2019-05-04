// ==UserScript==
// @name         广告去除（PayneV）
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  you didn't see that coming?AD
// @author       PayneV
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @match        /^https?\:\/\/[^\s]*/
// @include        http://*
// @include        https://*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new MutationObserver(function(records){
        clearAD();
    });
    var option = {
        'childList': true,
        'subtree': true
    };
    observer.observe(document.body, option);

    function clearAD(){
        var mAds=document.querySelectorAll(".ec_wise_ad,.ec_youxuan_card"),i;
        for(i=0;i<mAds.length;i++){
            var mAd=mAds[i];
            mAd.remove();
        }
        var list=document.body.querySelectorAll("#content_left>div,#content_left>table");
        for(i=0;i<list.length;i++){
            let item = list[i];
            let s = item.getAttribute("style");
            if (s && /display:(table|block)\s!important/.test(s)) {
                item.remove();
            }else{
                var span=item.querySelector("div>span");
                if(span && span.innerHTML=="广告"){
                    item.remove();
                }
                [].forEach.call(item.querySelectorAll("a>span"),function(span){
                    if(span && (span.innerHTML=="广告" || span.getAttribute("data-tuiguang"))){
                        item.remove();
                    }
                });
            }
        }

        var eb = document.querySelectorAll("#content_right>table>tbody>tr>td>div");
        for(i=0;i<eb.length;i++){
            let d = eb[i];
            if (d.id!="con-ar") {
                d.remove();
            }
        }
 
			try{
				 var arr = document.querySelectorAll('.tracking-ad');
				 for (var j = 0; j < arr.length; j++) {
					 if(null === arr[j].id || "" === arr[j].id){
						 arr[j].parentNode.removeChild(arr[j]);
					 }
				}
                arr = document.querySelectorAll('div');
				 for (var j = 0; j < arr.length; j++) {
					 if(null === arr[j].id || "" === arr[j].id){
                         if(arr[j].innerHTML=="广告"){
                             arr[j].parentNode.removeChild(arr[j]);
                         }
					 }
				}
                $(".similar_article").remove();
                $("[class^=ad]").remove();
                /*https://www.liaoxuefeng.com*/
                if(location.hostname === "www.liaoxuefeng.com"){
                    $("#x-sponsor-a").remove();
                    $("#x-sponsor-b").remove();
                }
                /*https://www.liaoxuefeng.com*/
			}catch(e){
                /*--------------*//** 调试用 TEST *//*--------------*/
                console.group("广告去除(PayneV");
                console.error(e);
                console.groupEnd();
                /*--------------*//** 调试用 TEST *//*--------------*/
			}

    }
    setTimeout(()=>{clearAD();},2000);
})();