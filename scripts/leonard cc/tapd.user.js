// ==UserScript==
// @name         tapd
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.tapd.cn/*
// @grant        none
// ==/UserScript==

$(function(){

    setInterval(function(){
        if (!$('.left-tree-project-list').hasClass('slide-out')) {
            $('.left-tree-project-list').addClass('slide-out');
        }
    },  10);


    $('.frame-main').attr('style','margin-left:290px !important');
    $('.project-nav').css('left', '290px');
    $('.page-content').css('left', '290px');
    //$('.project-nav').css('z-index', 99999);
});