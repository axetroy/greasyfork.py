// ==UserScript==
// @name         填充sokindle网站
// @namespace    www.liaobaocheng.com
// @version      2.1
// @description  减少重复工作
// @author       liaobaocheng
// @match        https://sokindle.com/*
// @require      http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @grant        none
// ==/UserScript==

(function(){
  $(document).ready(function(){
      if($(".euc-y-i")){
        $(".euc-y-i").val('523523');
        setTimeout(function(){
          $(".euc-y-s").click()
          },1000);
        }else{

if (window.clipboardData && clipboardData.setData) {
var s = $(".e-secret").text().substring(5,9)
 clipboardData.setData('text', s);
 }
        }
      })
  })();