// ==UserScript==
// @name         Weibo album新浪微博相册大图链接修改
// @namespace    http://weibo.com/unluckyninja/
// @version      0.1
// @description  把微博相册大图页上方导航栏的链接，全部替换成大图链接（原为详细页地址）
// @author       UnluckyNinja
// @match        http://photo.weibo.com/*/photos/large/*
// @require      http://code.jquery.com/jquery-3.1.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).on('click', '#slider', function(){
        $('#slider a[href]').each(function(i){
            var url = $(this).attr('href');
            url = url.replace('detail', 'large');
            $(this).attr('href', url);
        });
    });
})();