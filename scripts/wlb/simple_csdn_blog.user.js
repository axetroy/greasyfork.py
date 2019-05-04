// ==UserScript==
// @name         simple_csdn_blog
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  自动阅读全文
// @author       wlb
// @match        https://blog.csdn.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if($('#btn-readmore').length > 0){
        $('#btn-readmore').click();
    }
    
    remove('.tool-box'); // 删除分享
    remove('.recommend-box'); // 删除推荐
    // remove('#asideFooter'); // 删除联系我们
    remove('aside'); // 删除侧边栏
    remove('.edu-promotion'); // 删除底部广告
    remove('.pulllog-box');
    remove('.meau-gotop-box');
    makeWide()// 设置宽度 100%

    // delete by selector
    function remove(exp){
        var node = $(exp);
        if(node.length > 0){
            node.remove();
        }    
    }
    
    function makeWide(){
        if($('main').length > 0){
            $('main').css('width', '100%');    
        }
    }
})();