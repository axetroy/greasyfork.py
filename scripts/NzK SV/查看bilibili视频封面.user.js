// ==UserScript==
// @name         查看bilibili视频封面
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  双击视频标题栏展示封面
// @author       SVNzK
// @match        *://www.bilibili.com/*
// @grant        none

// ==/UserScript==
window.onload=(function(){
    window.cover_image=false;
    function huoqutianjia() {
var img,tg,mt;




mt=$("meta[property='og:image']");
if(mt.length==0){return false;}
        mt=mt[0];
img=$("<img>").attr("src",mt.content);
    img.on("click",function(){$("<a></a>").attr({href:mt.content,target:"_blank"})[0].click();});
    img=img[0];
    img.style.display="block";
    img.style.margin="0 auto";

    //$("#__bofqi").before(img);
tg=$("<div id='cover_image'></div>").append(img);
        tg.css("margin-bottom","20px");
        tg.css("display","none");
    $("#__bofqi").parent().prepend(tg[0]);
        window.cover_image=true;
    $("#comment.comment-m.report-wrap-module.report-scroll-module").before(tg[0]);
return true;


    };

$("#viewbox_report,#arc_toolbar_report,#v_upinfo,#v_desc,#v_tag").parent().on("dblclick",function(e){
    if(window.cover_image==false){
        huoqutianjia();

    }
    $("#cover_image").slideToggle("slow");
    });
});

