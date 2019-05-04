// ==UserScript==
// @name        淘宝卖家宝贝分类id SellerCidsFinder
// @namespace   https://github.com/eurekazheng/Taobao-Vendor-Migration
// @description 淘宝卖家后台（旺铺）显示宝贝分类id Displays seller_cids on category page of Taobao vendor backend
// @include     https://siteadmin.taobao.com/category/index.htm*
// @require     http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.js
// @version     1
// @grant       none

(function(){
  $(".menu-wrapper").append("<li class='level-1'><a class='J_TCatSrch menu-item bold'><span class='line'></span><span>不要保存更改哟~!</span></a></li>");
  $(".input-text.J_CatName").each(function(){
    $(this).val($(this).val() + " " + $(this).attr("id").substr(5, 10));
  });
})();

// ==/UserScript==