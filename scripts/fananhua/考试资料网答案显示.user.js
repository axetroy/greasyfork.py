// ==UserScript==
// @name         考试资料网答案显示
// @namespace    https://greasyfork.org/zh-CN/scripts/31190-%E8%80%83%E8%AF%95%E8%B5%84%E6%96%99%E7%BD%91%E7%AD%94%E6%A1%88%E6%98%BE%E7%A4%BA
// @version      0.4.3
// @description  对单个题目进行跳转，使得跳转后的页面显示题目的答案
// @author       OneBe
// @match        *://www.ppkao.com/tiku/shiti/*
// @match        *://www.ppkao.com/kaoti/*
// @include      *://www.ppkao.com/tiku/shiti/*
// @include      *://www.ppkao.com/kaoti/*
//@exclude       *://www.ppkao.com/kaoti/daan/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
//清除限制题目访问数量的cookie
 var Days = 30; 
 var exp = new Date(); 
 exp.setTime(exp.getTime() + Days*24*60*60*1000); 
 document.cookie="PPKAO=PPKAOSTID=&PPKAOCEID=&PPKAOSJID=&UserName=&EDays=; domain=ppkao.com;expires="+exp.toGMTString()+";path=/";     
 var iSite = window.location.href;
 var reg = /[1-9][0-9]*/g; 
 var numList = iSite.match(reg);   
 var isKaoti =new RegExp("kaoti").test(iSite);
 var isTiku =new RegExp("tiku").test(iSite);
 var sUrl="";
 if (isKaoti===true)
  {
  sUrl='http://api.ppkao.com/mnkc/kaoti/?id=' + numList;
  }
 else
  {
   if(isTiku===true)
   {
    sUrl='http://api.ppkao.com/mnkc/tiku/?id=' + numList;
   }  
  }     
 window.location.href =sUrl;
})();