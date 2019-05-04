// ==UserScript==
// @name         巴哈姆特吧啦串小心按噓功能
// @namespace    http://www.isaka.idv.tw/
// @version      0.2
// @description  吧啦串要小心不要按到噓～現在按到的時候會再次詢問你～
// @author       Isaka(jason21716@巴哈姆特)
// @match        https://guild.gamer.com.tw/guild.php*
// @match        https://guild.gamer.com.tw/singleACMsg.php*
// @match        https://home.gamer.com.tw/bahawall.php*
// @match        https://home.gamer.com.tw/singleACMsg.php*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
(function() {
    'use strict';
    $('.msgitembar span:nth-child(4)').each(function(){
        if( $(this).children().length > 0 ){
            $(this).find('a').text('噓(小心)');
            $(this).find('a').click(function(e){
                if(confirm("你按下了噓鍵！你真的要這樣做嗎？")){
                    return;
                }else{
                    e.preventDefault();
                }
            });
        }
    });
})();