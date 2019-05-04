// ==UserScript==
// @name         洛谷在线编程模式
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  让洛谷像Vijos一样可以进入在线编程模式，左边看题目，右边写代码
// @author       abc2237512422
// @match        https://www.luogu.org/problemnew/show/*
// @match        http://www.luogu.org/problemnew/show/*
// @match        https://www.luogu.org/problem/show/
// @match        http://www.luogu.org/problem/show/
// @grant        none
// ==/UserScript==

var prob=document.getElementsByClassName("lg-article")[0].innerHTML;
prob=prob.replace("id=\"expandstd\"","id=\"expandstd-in-multi\"").replace("id=\"stdcode\"","id=\"stdcode-in-multi\"");
var title=document.getElementsByClassName("lg-toolbar")[0].innerHTML;
class main {
    constructor(){
        $($("#psummary")[0].getElementsByTagName("p")[0]).append("</br><button id='intoMultiMode' style='margin-top:5px;outline:none;' class='am-btn am-btn-danger am-btn-sm'>进入在线编程模式</button>");
    }
    into(prob,title){
        //alert(prob);
        $("#submit").click();
        var css="<style id='multimodecss'>.multi-left{border-radius:0px !important;width:auto;position:fixed;opacity:1!important;left:0px;top:0px;bottom:0;right:50%;z-index:1000000;background:#fff !important;margin:0!important;padding-left:15px;padding-right:8px;overflow-y:scroll !important;overflow-x:hidden;display:block}#sub{overflow-y:auto !important;border-radius:0px !important;position:fixed;background:#fff !important;z-index:1000000;top:0px;right:0;left:50%;bottom:0;margin:0!important;display:block;width: auto;}.lg-footer,.lg-footer-top{background:rgba(52,73,94,1) !important;}html{overflow-y: hidden;}#submain .am-alert{display:none;}</style>";
        $(document.getElementsByClassName("lg-main-content")[0]).append(css);
        var left="<div id='muitileft' class='lg-article am-g multi-left'>"+title+prob+"</div>";
        $(document.getElementsByClassName("lg-main-content")[0]).append(left);
        $(".sample-copy").click(function(){var element=$(this).parents(".copy-region").find("pre");var text=$(element).text();var $temp=$("<textarea>");$("body").append($temp);$temp.val(text).select();document.execCommand("copy");$temp.remove();$(this).text("复制成功").removeClass("lg-bg-orange");var e=this;setTimeout(function(){$(e).text("复制").addClass("lg-bg-orange")},500)});//让新添加的题面也支持复制样例
        $("#expandstd-in-multi").click(function(){$("#stdcode-in-multi").slideDown();$("#expandstd-in-multi").hide()});//重新设置标程展开按钮点击事件
        var intervaler=setInterval(function(){if(document.getElementById("submain")!=undefined){clearInterval(intervaler);$($("#submain")[0].getElementsByTagName("a")[0]).after("<a onclick='$(\"#muitileft\").remove();$(\"#multimodecss\").remove();$($(\"#submain\")[0].getElementsByTagName(\"a\")[0]).click();' class='am-btn am-btn-primary am-btn-sm' title='退出后您的代码不会被保存，请在退出前手动保存您的代码。'>退出在线编程模式</a>");$($("#submain")[0].getElementsByTagName("a")[0])[0].style.display="none";}},50);
        var cnt=0,intervaler2=setInterval(function(){cnt++;if ($("#sub")[0].style.display=="none"){$("#muitileft").remove();clearInterval(intervaler2);return;}if(cnt>50){clearInterval(intervaler2)}},100);
    }
}
var multi = new main();
$("#intoMultiMode")[0].onclick=function(){
    multi.into(prob,title);
};