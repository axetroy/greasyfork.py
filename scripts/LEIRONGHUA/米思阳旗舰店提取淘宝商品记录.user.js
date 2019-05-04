// ==UserScript==
// @name         米思阳旗舰店提取淘宝商品记录
// @namespace    http://leironghua.com/
// @version      0.4
// @description  米思阳旗舰店提取淘宝商品记录。
// @author       雷荣华
// @include      *//siyang.tmall.com/p*
// @include      *//siyang.tmall.com/category-*
// @grant        unsafeWindow
// @grant        GM_setClipboard
// @run-at       document-end
// @require      https://cdn.bootcss.com/jquery/1.10.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    $('.sn-back-home').append('<a id="_goods" class="sn-register" href="javascript:void(0);" >【提取本页商品信息】</a>');
    $('#_goods').on('click',function(){
        var select = '.item   ';
        if($('.J_TItems').length != 0){
            select =  '.J_TItems ' + select;
        }
        var data = "商品ID\t商品价格\t商品名称\t商品地址",itemCount = 0;
        $(select).each(function(i,v){
            // 本店推荐的不要
            if($(v).find('.item-name').text().indexOf('                                ') == 0){
                return;
            }
            data +="\r\n" + $(v).attr('data-id') + '\t' + $(v).find('.c-price').text() + '\t' + $(v).find('.item-name').text() + "\thttp:" + $(v).find('.item-name').attr('href');
            itemCount++;
        });
        console.info(data);
        var i = confirm('共 '+itemCount+' 个商品记录提取完成，是否需要复制到剪贴板？');
        if(i){
            GM_setClipboard(data,'text');
        }
    });

})();