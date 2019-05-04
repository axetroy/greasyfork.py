// ==UserScript==
// @name         163图集完整显示
// @namespace    https://greasyfork.org/zh-CN/users/10666-sbdx
// @version      2017.07.19
// @description  看网易图集的时候一张一张的翻很麻烦，本脚本可以让所有图片全部展示出来。
// @author       塞北的雪
// @match        *.163.com/photoview/*
// @grant        none
// @require  	 https://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==


function ShowAllImage()
{
    pics=$.parseJSON($("textarea[name='gallery-data']").text());
    str='';
    $(pics.list).each(function(i){
        str+='<img src="'+pics.list[i].oimg+'"><br><br>';
    });
    $('.photoarea').children().remove();
    $('.photoarea').html(str);
    $('.photoarea').css('z-index',10000000);//设置为最上层
}

$(function(){
    $("body").append("<div id='tools_sbdx' style='position:absolute;right:10px;top:100px;z-index:1000000000'><button>显示全部图片</button></div>");
    $("#tools_sbdx button").on("click",ShowAllImage);
	$(window).scroll(function(){$("#tools_sbdx").offset({top:$(document).scrollTop()+100});});
});