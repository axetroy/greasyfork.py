// ==UserScript==
// @name           Buying Item Script
// @namespace      Buying Item Script
// @version        1.0
// @description    Item market item buyer
// @author         Alec
// @grant          none
// @include        http://www.torn.com/imarket.php#/p=shop&type=*
// @include        https://www.torn.com/imarket.php#/p=shop&type=*
// @include        http://*.torn.com/imarket.php#/p=shop&type=*
// @include        https://*.torn.com/imarket.php#/p=shop&type=*
// @match          http://www.torn.com/imarket.php#/p=shop&type=*
// @match          https://www.torn.com/imarket.php#/p=shop&type=*
// @match          http://*.torn.com/imarket.php#/p=shop&type=*
// @match          https://*.torn.com/imarket.php#/p=shop&type=*

// ==/UserScript==


$(document).ready(function() {
  var hrefs = new Array();
  var elements = $('.headline > a');
  elements.each(function() { 
    hrefs.push($(this).attr('href'));
  });
    
  $('body').append('<input type="button" value="Open Links" id="CP">');
  $("#CP").css("position", "fixed").css("top", 0).css("left", 0);
  $('#CP').click(function(){ 
    $.each(hrefs, function(index, value) { 
      setTimeout(function(){
       window.open(value, '_blank');
      },1000);
    });
  });
});