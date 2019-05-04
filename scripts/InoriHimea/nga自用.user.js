// ==UserScript==
// @name         nga自用
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  搞事情（匹配https）
// @author       You
// @match        *://bbs.nga.cn/*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/1.7.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    //debugger;
    var local = window.location;
    var url = local.href;

    if (url.indexOf('/misc/') !== -1) {
        if (local.search.match(/nga\.cn|nga\.donews\.com|ngacn\.cc|178\.com|ngabbs\.com|bigccq\.cn/))
            local.replace(local.search.substr(1))
        else
            local.replace('https://'+l.host)
    }

    if (url.indexOf('php') == -1) {
       $('img').each(function(){
           console.log($(this).attr('onload'));
           if ($(this).attr('onload') !== 'undefined') {
              $(this).parent().parent().remove();
           }
       });
    } else {
       $('div.w100 > span:first').remove();
       if ($('td.null')) {
          $('td.null').remove();
       }
    }

    var $scollerDiv = $('div.ubbcode');
    console.log("滚动条div：" + $scollerDiv.length);

    $scollerDiv.each(function() {
       var $this = $(this);
       var maxHeight = $this.css('max-height');
       console.log(maxHeight);

       if (maxHeight !== 'none') {
          $this.css('max-height', 'none');
       }
    });
})();