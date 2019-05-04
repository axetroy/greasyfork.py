// ==UserScript==
// @version 20180807
// @name 京东评价存图
// @namespace JDSaveImage
// @match https://item.jd.com/*
// @grant none
// @description 可以保持京东的晒图，用来晒单啊
// ==/UserScript==
   
$(function(){  
setTimeout(function(){ showimg();}, 2000);
setTimeout(function(){ showimg();}, 3000);
setTimeout(function(){ showimg();}, 4000);
setTimeout(function(){ showimg();}, 5000);

});
function showimg(){
  $('[class="tab-main large pro-detail-hd-fixed"]').find("li:eq(4)").click();
  $('[class="tab-main small"]').find("li:eq(1)").click();
  $('.cursor-right,.cursor-left').attr("style","width:80px;border-style:solid;border-color:red;");
}