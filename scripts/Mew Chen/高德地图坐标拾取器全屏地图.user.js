// ==UserScript==
// @name         高德地图坐标拾取器全屏地图
// @namespace    http://mewchen.com/
// @version      0.2
// @description  高德地图的坐标拾取器，默认高度只有575px，本脚本将地图高度根据浏览器高度自适应，并移除了没有用的header和footer部分。
// @author       MewChen
// @include      http://lbs.amap.com/console/show/picker
// @grant        none
// ==/UserScript==

$(document).ready(function(){
    $('header').css("display","none");
    $('footer').css("display","none");
    $('#myPageTop').css("margin","0 auto");
    $('.page_wrapper').css("top","0px");
    $('.main_content').css("margin","0 auto");
    $('#map').height($(window).height()-76);
})();