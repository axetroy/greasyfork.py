// ==UserScript==
// @name cc58同城自用过滤器,欢迎自己修改
// @namespace Violentmonkey Scripts
// @match https://cc.58.com/*
// @grant none
// @description  cc58同城自用过滤器,欢迎自己修改,用于过滤58同城不想要的条目
// @version 0.0.1.20190108095827
// ==/UserScript==
//拿到列表
//
var lists=$(".house-list-wrap").children();
$.each(lists, function( i, l ){
  if($(l).find(".baseinfo").eq(0).text().match(/高层\(共[678]层\)/)){
    $(l).remove();
  }
  //没有轨道
  if($(l).find(".baseinfo").eq(1).children().length===1){
    $(l).remove();
  }
  //轨道不应该超过1000
  else if(parseInt($(l).find(".baseinfo").eq(1).children().text().match(/\d+米/)[0])>1000){
    $(l).remove();
  }
  if($(l).find(".jjrinfo").children().eq(1).text().match(/史媛媛/)){
    $(l).remove();
  }
  //汽车城
  if($(l).find(".baseinfo").eq(1).text().match(/汽车城/)){
    $(l).remove();
  }
});