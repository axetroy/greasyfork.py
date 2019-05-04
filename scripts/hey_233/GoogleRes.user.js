// ==UserScript==
// @name        GoogleRes
// @version     0.1
// @author      hey_233
// @description 在谷歌搜索结果页面添加底部搜索框，并修改搜索结果打开方式为新窗口打开 / add another input for search at the bottom of result page & change the way to open each result from "current tab" to "new tab"
// @namespace   Violentmonkey Scripts
// @include     *://www.google.com*/search*
// @require     https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant       none
// @run-at      document-body
// ==/UserScript==

'use strict';

(function(){
  $(function(){
    var $as = $('#rso').children().children().find('a'),
        $fas = $('#fbar').find('a'),
        $tsf = $('#tsf'),
        $resul = $('sbtc').children('.gstl_0.sbdd_a'),
        $lst = $('#lst-ib'),
        $cloneForm = $tsf.clone(true);
    $as.each(function(i,e){
      e.target = '_blank';
    });
    $fas.each(function(i,e){
      e.target = '_blank';
    });
    $cloneForm.attr('id','_cloneForm').find('#gs_st0').attr('id','_cloneGs_st0').next().find('#lst-ib').attr('id','_cloneLst-ib').on({
      click: function(e){
        e.stopPropagation();
      },
      focus: function(){        
        $tsf.css('position','fixed');
      },
      input: function(){
        $lst.val(this.value);//.trigger('input');
      },
      blur: function(){
        $resul.hide();
      }
    });
    $cloneForm.css('marginBottom','25px');
    $cloneForm.find('#_cloneGs_st0').children('a').on('click',function(){
      $('#gs_st0').children('a').click();console.log(2)
    });
    $('#rcnt').on('click',function(){
      $tsf.css('position','');
    }).append($cloneForm);
  });
}());
