// ==UserScript==
// @name wtfScript
// @description 用于爱问共享资料 不负责维护 XD
// @match http://ishare.iask.sina.com.cn/f/*
// @version 1.0
// @grant none
// @namespace https://greasyfork.org/users/173996
// ==/UserScript==

$(function() {
  (function() {
    // 如果页面存在下载按钮 直接返回
    var el = $('.detail-footer');
    if ($('.btn-download').length > 0) return;
    
    // 创建下载按钮
    var wtfDownload =` 
      <div class="detail-pay-btn-con"> 
        <a class="btn-detail btn-download"> 
          <i class="icon-iShare"></i> 
          下载 
      </div> 
      ` ; 
    el.append(wtfDownload);
    
    // 发送请求
    $(".detail-pay-btn-con").delegate(".btn-download", "click", function() { 
      $.ajax({ 
        async: false, 
        type: "GET", 
        url: "/f/preDownload/" + $("#fileId").val() + "?rnd=" + Math.random(), 
        dataType: "json", 
        success: function(a) { 
          downloadResult(a); 
        } 
      }); 
      return false; 
    });

  
}());

});