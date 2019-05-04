// ==UserScript==
// @name         去除百度搜索广告
// @namespace    http://tampermonkey.net/
// @version      0.21
// @description  去除百度搜索推广、广告
// @author       大雄、小虾吃大虾
// @match        http*://*.baidu.com/*
// @grant        none
// ==/UserScript==

$(function(){
    ///页面加载完成后，500毫秒调用去除广告
    setTimeout(function(){
        startAD();
    },500);
});

function startAD(){
    ///每500毫秒执行一次去除广告
    setInterval( function (){
        ///百度经验底部广告
        $('.EC_result').remove();

        ///百度搜索界面广告
        var container = document.getElementById( 'content_left' );
        if(container){
            Array.from( container.children).forEach( function ( item ){
                if( item && /display:block\s+!important;visibility:visible\s+!important/i.test( item.getAttribute( 'style' ) ) )
                {
                    $(item).fadeTo("fast",0.01,function(){
                        $(item).slideUp("normal",function(){
                            $(item).remove();
                        });
                    });
                }

                if($(item).find('span').text() == "广告")
                {
                    $(item).fadeTo("fast",0.01,function(){
                        $(item).slideUp("normal",function(){
                            $(item).remove();
                        });
                    });
                }
            }, container );
        }
    }, 500 );
}