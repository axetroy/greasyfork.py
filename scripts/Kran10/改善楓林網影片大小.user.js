// ==UserScript==
// @name         改善楓林網影片大小
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  這是一個無聊人在無聊時寫出來的小插件，歡迎留言提出建議
// @author       Kran10
// @match        http://fenglin.to/*
// @match        http://video.fenglin.to/*
// @match        http://8maple.ru/*
// @match        http://video.8maple.ru/*
// @grant        none
// @require    	https://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
var text = '插件版本：0.6&emsp;<a href="https://greasyfork.org/zh-TW/scripts/371336-%E6%94%B9%E5%96%84%E6%A5%93%E6%9E%97%E7%B6%B2%E5%BD%B1%E7%89%87%E5%A4%A7%E5%B0%8F" target="_blank" rel="noopener noreferrer">插件網站</a>'
var web = $(location).attr('hostname');
    'use strict';

    if((web=="8maple.ru"||web=="fenglin.to")&&$("div").hasClass("video")){

//fix-CSS-problem
    $('#sidebar').remove();
    $('#main div:first').css({'width':'100%'});
    $('.entry-header').addClass('wrap');
    $('#content').css({'width':'100%'});
    $("#video").css({"width":"100%","margin":"auto"});

//Adjust Frame
    $("#video iframe").removeAttr('width height');
    $("#video iframe").css({"width":"100%",'height':'-webkit-fill-available'});

//Create Button
    $('.entry-content p:first').html('');

    //Adding button from left to right
     $('#video').before("&emsp;");
    var size = ["80%","90%","100%"];

    for(var i = 0;i<size.length;i++){
        createSizeButton(size[i], $('#video'));
    }

        //Add Space between button and video
    var Space = document.createElement("p");
    Space.style.margin = "auto";
    Space.style.opacity = "0";
    Space.id = "version"
    $('#video').before(Space);
    $('#version').html(text);
    $('#version').mouseover(function(){$("#version").css('opacity',"1")});
    $('#version').mouseout(function(){$("#version").css('opacity',"0")});

    }

//Content in player
    if(web=="video.8maple.ru"||web=="video.fenglin.to"){
    $( document ).ready(function(){
//remove ad
     $(".baiduyytf").remove();
     $("#ad_bar1").remove();
     $("#ad_bar7").remove();
     $("#yytf").remove();
//Adjust Frame
     $('#hddbox').css({'width':'100%','height':'-webkit-fill-available'});
     $('#jwplayer').css({'height':'-webkit-fill-available'});

//Play instantly
     $("#djs").html("0");
    }
    );
    }
})();


function createSizeButton(size,path) {
    var x = document.createElement("BUTTON");
    var t = document.createTextNode(size);
    x.appendChild(t);
    x.type = "button";
    x.onclick = function(){$("#video").css('width',size);};
    path.before(x);
    path.before("&emsp;");
}


