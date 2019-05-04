// ==UserScript==
// @name     GMail Sidebar Toggle (Show/Hide)
// @author  sm00nie
// @version  1.01
// @description Toggle GMail's sidebar with the Side Bar button
// @grant    none
// @include /^https?:\/\/mail\.google\.com(?:.*)$/
// @require http://code.jquery.com/jquery-latest.js
// @namespace https://greasyfork.org/users/165048
// ==/UserScript==
$(window).bind("load", function() {
  $('<div id="gm-sideBar" class="T-I J-J5-Ji ar7 nf T-I-ax7 L3" role="button" tabindex="0" aria-haspopup="false" aria-expanded="false" style="-moz-user-select: none;"><span class="bjy">Side Bar</span></div>').insertAfter(".T-I.J-J5-Ji.ar7.nf.T-I-ax7.L3"); 
  var mailTbl = $('.nH.bkK.nn'), mailTblWidth = $('.nH.bkK.nn').width(), sideBar = $(".nH.oy8Mbf.nn.aeN");
  $(document).on("click", "#gm-sideBar", function() {
    if(sideBar.css("display") == "none") {
			sideBar.css("display", "block");
      mailTbl.css("width", mailTblWidth);
    } else {
      sideBar.css("display", "none");
      mailTbl.css("width", "100%");
    }
  });

  $(window).resize(function() {
    if(sideBar.css("display") == "none") {
			mailTbl.css("width", "100%");
    }
    mailTblWidth = $('.nH.bkK.nn').width();
  });
});