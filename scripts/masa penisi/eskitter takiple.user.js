// ==UserScript==
// @name          eskitter takiple
// @namespace     http://userstyles.org
// @description	  anan
// @author        masa penisi
// @include https://eksitter.com/cevrimici*
// @version 0.0.1.20150201161730
// ==/UserScript==

$( "a[rel=tooltip]" ).each(function( index ) {
  var username = $(this).attr('href').replace("https://eksitter.com/","");
  user_follow(username,this,'usrpg_btn_unfollow');
});
