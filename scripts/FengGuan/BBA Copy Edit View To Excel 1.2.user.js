// ==UserScript==
// @version        2016.09.12
// @name        BBA Copy Edit View To Excel 1.2
// @namespace   BBACopy2Excel
// @author	      fengguan.ld~gmail。com
// @include     *192.168.3.8/BBA*
// @encoding       utf-8
// @grant          unsafeWindow
// grant          GM_openInTab
// @description 为了快速简便地调整字段的column index和字段的tab index

// ==/UserScript==
$(function () {
  $("[ID$=lblTitle]").click(function(){    
    alert("duang");
  });
  var $btnCopy2Excel = '<input type="button" value="Copy to Excel" id="btnCopy2Excel" class="button" style="margin-right:20px;width:120px;" >';
  $("[ID$=lnkHelpText]").before($btnCopy2Excel);
  $("#btnCopy2Excel").click(function(){    
    $tblMail=$("[ID$=tblMain]");
    $tblMail.find(".tabDetailViewDL input,img").hide();   
  });
});
